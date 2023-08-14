export class CustomActiveEffect extends CONFIG.ActiveEffect.documentClass {
    constructor(effect, owner) {
        super(effect, { parent: owner });
    }

    async create(context) {
        // TODO: create effect
    }

    async delete(context) {
        // TODO: delete effect
    }

    async update(context) {
        // TODO: update effect
    }

    async transfer(context) {
        // TODO: transfer effect
    }

    async duration(context) {
        // TODO: create effect
    }

    async manage(context) {
        // TODO: manage/manipulate item
    }
}