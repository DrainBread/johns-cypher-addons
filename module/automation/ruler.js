import { isInsideCircle, isClockwise, isInsideRectangle, doLinesIntersect } from "../../utilities/utils.js";

export async function createRuler(distance, shape, macro, ...args){

    if(!shape)
        shape = 'circle';

    let templateData = {
        t: shape,
        user: game.user.id,
        distance: distance,
        direction: 0,
        target: {},
        x: 0,
        y:0,
        fillColor: game.user.color
    }

    switch(shape){
        case "cone":
            templateData.angle = 45;
            break;
        case "rect":
            templateData.distance = Math.hypot(distance, distance);
            templateData.width = distance;
            templateData.direction = 45;
            break;
        case "ray":
            templateData.width = 1;
            break;
        default:
            break;
    }

    const template = new MeasuredTemplateDocument(templateData, {parent: canvas.scene});
    const object = new MeasuredTemplate(template);

    const initialLayer = canvas.activeLayer;
    // Draw the template and switch to the template layer
    object.draw();
    object.layer.activate();
    object.layer.preview.addChild(object);

    

    ui.notifications.info(game.i18n.localize("JOHNSCYPHERADDONS.RulerTutorial"));
    const handlers = {};

    let moveTime = 0;

    // Update placement (mouse-move)
    handlers.mm = event => {
        event.stopPropagation();
        let now = Date.now(); // Apply a 20ms throttle
        if ( now - moveTime <= 20 ) return;
        const center = event.data.getLocalPosition(object.layer);
        const snapped = canvas.grid.getSnappedPosition(center.x, center.y, 2);

        if ( game.release.generation < 10 ) 
            object.data.update({x: snapped.x, y: snapped.y});
        else 
            object.document.updateSource({x: snapped.x, y: snapped.y});

        object.refresh();
        moveTime = now;
    };

    // Cancel the workflow (right-click)
    handlers.rc = event => {
        object.layer._onDragLeftCancel(event);
        canvas.stage.off("mousemove", handlers.mm);
        canvas.stage.off("mousedown", handlers.lc);
        canvas.app.view.oncontextmenu = null;
        canvas.app.view.onwheel = null;
        initialLayer.activate();
        object.actorSheet?.maximize();
    };

    // Confirm the workflow (left-click)
    handlers.lc = event => {
        handlers.rc(event);
        const destination = canvas.grid.getSnappedPosition(object.data.x, object.data.y, 2);

        if ( game.release.generation < 10 ) 
            object.data.update(destination);
        else 
            object.document.updateSource(destination);

        canvas.scene.createEmbeddedDocuments("MeasuredTemplate", [object.data.toObject()]);
        
        let targetMap;
        let targetsIds = [];
        const gridPixels = canvas.scene.data.grid;
        const gridDistance = canvas.scene.data.gridDistance;
        const radius = (distance/gridDistance)*gridPixels;
        let tokens = game.canvas.tokens.placeables;
        
        switch(shape){
            case 'circle':                
                targetMap = [...tokens.entries()].filter(([key, val]) => {
                    let bounds = [
                        {x: val.bounds.left, y: val.bounds.top},
                        {x: val.bounds.right, y: val.bounds.top},
                        {x: val.bounds.left, y: val.bounds.bottom},
                        {x: val.bounds.right, y: val.bounds.bottom},
                        val.center
                    ]

                    for(const point of bounds){
                        if(isInsideCircle(destination, radius, point))
                            return true;
                    }

                });
                break;
            case 'cone':
                // Object rotation in the X axis
                const rotation = Math.toRadians(object.data.direction + 360);

                // Angle of the opening of the cone, divided by 2 since the rotation is right at the middle of the cone.
                const internalHalf = Math.toRadians(object.data.angle / 2); 

                // "Lower" end of the cone
                let extremeA = {
                    x: destination.x + (radius * Math.cos(rotation + internalHalf)),
                    y: destination.y + (radius * Math.sin(rotation + internalHalf))
                };

                // "Upper" end of the cone
                let extremeB = {
                    x: destination.x + (radius * Math.cos(rotation - internalHalf)),
                    y: destination.y + (radius * Math.sin(rotation - internalHalf))
                };

                targetMap = [...tokens.entries()].filter(([key, val]) => {
                    let bounds = [
                        {x: val.bounds.left, y: val.bounds.top},
                        {x: val.bounds.right, y: val.bounds.top},
                        {x: val.bounds.left, y: val.bounds.bottom},
                        {x: val.bounds.right, y: val.bounds.bottom},
                        val.center
                    ]

                    for(const point of bounds){
                        if(!isClockwise(destination, point, extremeA) 
                            && isClockwise(destination, point, extremeB) 
                            && isInsideCircle(destination, radius, point)){
                                return true;
                            }
                    }
                });
                break;
            case 'rect':
                const rectangle = object.ray.bounds;

                targetMap = [...tokens.entries()].filter(([key, val]) => {
                    let bounds = [
                        {x: val.bounds.left, y: val.bounds.top},
                        {x: val.bounds.right, y: val.bounds.top},
                        {x: val.bounds.left, y: val.bounds.bottom},
                        {x: val.bounds.right, y: val.bounds.bottom},
                        val.center
                    ]
                    for(const point of bounds){
                        if(isInsideRectangle(point, rectangle))
                            return true;
                    }
                });

                break;
            case 'ray':
                const A = object.ray.A;
                const B = object.ray.B;

                targetMap = [...tokens.entries()].filter(([key, val]) => {
                    
                    let C = {x: val.bounds.left, y: val.bounds.top};
                    let D = {x: val.bounds.right, y: val.bounds.top};
                    let E = {x: val.bounds.left, y: val.bounds.bottom};
                    let F = {x: val.bounds.right, y: val.bounds.bottom};
                    
                    return doLinesIntersect(A,B,C,D) 
                        || doLinesIntersect(A,B,D,E) 
                        || doLinesIntersect(A,B,E,F) 
                        || doLinesIntersect(A,B,F,C)
                });

                break;
            default:
                break;
            
        }
        if(targetMap.length)
            targetMap.forEach(target => { targetsIds.push(target[1].id) });

        if(targetsIds.length)
            game.user.updateTokenTargets(targetsIds);

        if(macro)
            game.macros.getName(macro).execute(destination, args);

        initialLayer.activate();
    };

    // Rotate the template by 3 degree increments (mouse-wheel)
    handlers.mw = event => {
        if ( event.ctrlKey ) 
            event.preventDefault(); // Avoid zooming the browser window

        event.stopPropagation();
        let delta = canvas.grid.type > CONST.GRID_TYPES.SQUARE ? 30 : 15;
        let snap = event.shiftKey ? delta : 5;
        const update = {direction: object.data.direction + (snap * Math.sign(event.deltaY))};
        
        if ( game.release.generation < 10 ) 
            object.data.update(update);
        else 
            object.document.updateSource(update);

        object.refresh();
    };

    // Activate listeners
    canvas.stage.on("mousemove", handlers.mm);
    canvas.stage.on("mousedown", handlers.lc);
    canvas.app.view.oncontextmenu = handlers.rc;
    canvas.app.view.onwheel = handlers.mw;

}