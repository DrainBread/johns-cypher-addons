export const database = {
    _templates: {
        //default: [100, 0, 0],
        cone: [100, 0, 0],
        cone100: [100, 100, 100],
        cone100_02: [100, 50, 150],
        cone200: [200, 100, 100],
        large: [200, 0, 0],
        line100: [100, 50, 150],
        melee: [200, 400, 400],
        ranged: [200, 100, 100],
        ray: [100, 0, 0],
        side_impact: [200, 100, 0]    
    },
    khopesh: {
        melee: { _template: 'melee', '01': { khopesh: [ "vfx/weapons/melee/khopesh/khopesh_1_800x600.webm" ] } }
    },
    krisnaga: {
        melee: { _template: 'melee', '01': { krisnaga: [ "vfx/weapons/melee/krisnaga/krisnaga_1_800x600.webm" ] } },
        throw: { _template: 'ranged', '01': { krisnaga: { '15m': "vfx/weapons/ranged/krisnaga/krisnaga_1_ranged_1000x400.webm" } } }
    },
    verred: {},
    parashu: {},
    chandrahasa: {},
    pralaya: {},
    trishula: {}
}