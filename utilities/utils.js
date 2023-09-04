export function generateId(size=16,chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'){
    let id = ''
    for(let i = 0; i < 16; i++) id+=chars[Math.floor(Math.random()*chars.length)];
    return id;
}

export function timeout(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}
export function measureDistance(tokenA, tokenB){
    return Math.floor(canvas.grid.measureDistance(tokenA, tokenB).toFixed(1));
}

export function clone(obj){
    return JSON.parse(JSON.stringify(obj));
}

export function mergeObjects(a, b, keep=false){
    let c = Object.assign(b, a);
    for(let key in c){
        if(!b[key] && !keep)
            delete c[key];
    }
    return c;

}

export function getLineSlope(a,b){
    if (a.x == b.x) return null;
    return (b.y - a.y) / (b.x - a.x); 
}

export function areLinesParallel(a,b,c,d){
    return getLineSlope(a,b) === getLineSlope(c,d);
}

export function doLinesIntersect(a, b, c, d){
    // Lines are parallel
    if (areLinesParallel(a,b,c,d)) return false;

    // The code below was shamelessly copy and pasted from the internet and it works flawlessly.
    // I suck at geometry and couldn't figure it out myself. bite me.
	let a1, a2, b1, b2, c1, c2;
	let r1, r2 , r3, r4;
	let denom;

	a1 = b.y - a.y;
	b1 = a.x - b.x;
	c1 = (b.x * a.y) - (a.x * b.y);

	r3 = ((a1 * c.x) + (b1 * c.y) + c1);
	r4 = ((a1 * d.x) + (b1 * d.y) + c1);

	if ((r3 !== 0) && (r4 !== 0) && Math.sign(r3) == Math.sign(r4))
		return false;
	
	a2 = d.y - c.y;
	b2 = c.x - d.x;
	c2 = (d.x * c.y) - (c.x * d.y);

	r1 = (a2 * a.x) + (b2 * a.y) + c2;
	r2 = (a2 * b.x) + (b2 * b.y) + c2;

	if ((r1 !== 0) && (r2 !== 0) && Math.sign(r1) == Math.sign(r2))
		return false;

	denom = (a1 * b2) - (a2 * b1);
	if (denom === 0) {
		return true;
	}

	return true;
}

export function isInsideCircle(center, radius, point){
    return Math.sqrt((point.x - center.x) **2 + (point.y - center.y) **2) <= radius;
}

export function isInsideRectangle(point, rectangle){
    return !(point.x < rectangle.left || point.x > rectangle.right || point.y > rectangle.bottom || point.y < rectangle.top);
}

export function isClockwise(origin, point, anchor){
    return (point.y - origin.y) * (anchor.x - point.x) - (point.x - origin.x) * (anchor.y - point.y) >= 0
}

export function sortObjKeys(obj){
    return Object.keys(obj).sort().reduce((objEntries, key) => {
        objEntries[key] = obj[key];
        return objEntries;
      }, {});
}

export function mergeMapsArrays(arr1, arr2, properties = ["key", "value"]){
    if(arr1 && arr1.length > 0){
        let ref = {};

        arr1.forEach(e => {
          ref[e.key] = e;
        });

        let newArr1 = arr2.map(e => {
            if(ref[e.key]){

                let element = {};
                properties.forEach( p => {
                    element[p] = ref[e.key][p];
                });
                return element;
            } else {
                return e;
            }
        });
        
        return newArr1;
    } else {
        return arr2;
    }
}

export function stringToArray(string){
    if(!string)
        return [];

    let args = [];
    string.split(';').forEach(e => {
        if(e.startsWith("{") && e.endsWith("}")){
            args.push(JSON.parse(e))
        }else if(e.startsWith("[") && e.endsWith("]")){
            let arr = e.slice(1,-1).split(",");
            let obj = []
            let eArr = []
            arr.forEach( x => {
                if(x.endsWith("}")){
                    obj.push(x);
                    eArr.push(JSON.parse(obj.join(",")))
                    obj = [];
                }else{
                    if(obj.length > 0)
                        obj.push(x)
                    if(x.startsWith("{"))
                        obj.push(x)
                    else
                        if(!isNaN(x))
                            eArr.push(parseFloat(x)) 
                        else if(x.toLowerCase() === "true" || x.toLowerCase() === "false")
                            eArr.push(x.toLowerCase() === "true")
                        else
                            eArr.push(x)
                }
            });
            args.push(eArr);
        }else{
            if(!isNaN(e))
                args.push(parseFloat(e)) 
            else if(e.toLowerCase() === "true" || e.toLowerCase() === "false")
                args.push(e.toLowerCase() === "true")
            else
                args.push(e)
        }
    });
    return args;
}

export function getRandPosAroundToken(x, y, radius, directionX, directionY){
    let offsetX = Math.random() > .5 ? 1 : -1;
    let offsetY = Math.random() > .5 ? 1 : -1;
    offsetX *= canvas.grid.size;
    offsetY *= canvas.grid.size;
    return {
        'x': x + (radius*directionX) + offsetX,
        'y': y + (radius*directionY) + offsetY
    }    
}
