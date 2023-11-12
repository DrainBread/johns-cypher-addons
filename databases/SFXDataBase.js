export const database = {
    system: {
        roll: {
            failure: ["modules/johns-cypher-addons/library/SFX/system/roll/failure.ogg"],
            criticalSuccess: ["modules/johns-cypher-addons/library/SFX/system/roll/criticalSuccess.ogg"],
            criticalFailure: {}
        },
        combat: {
            turn: {
                ally: {},
                enemy: {}
            },
            immunity: {},
            weakness: {},
            victory: {},
            condition: {
                debuff: ["modules/johns-cypher-addons/library/SFX/condition/debuff.ogg"],
                hazard: ["modules/johns-cypher-addons/library/SFX/condition/hazard.ogg"],
                sleep: ["modules/johns-cypher-addons/library/SFX/condition/sleep.ogg"],
                dizzy: ["modules/johns-cypher-addons/library/SFX/condition/dizzy.ogg"],
                confused: ["modules/johns-cypher-addons/library/SFX/condition/confused.ogg"],
                frozen: ["modules/johns-cypher-addons/library/SFX/condition/frozen.ogg"],
                paralyzed: ["modules/johns-cypher-addons/library/SFX/condition/paralyzed.ogg"]
            }
        },
        exploration: {
            discovery: {},
            puzzle: {
                introduction: {},
                overcome: {}
            }
        }
    },
    effect: {
        falling_rocks: "modules/johns-cypher-addons/library/SFX/effects/falling_rocks.ogg"
    },
    voice: {
        pc: {},
        npc: {
            sentry: {
                cry: [
                        "modules/johns-cypher-addons/library/SFX/voice/npc/sentry/cry/sentry_cry_1.ogg",
                        "modules/johns-cypher-addons/library/SFX/voice/npc/sentry/cry/sentry_cry_2.ogg"
                ],
                death: ["modules/johns-cypher-addons/library/SFX/voice/npc/sentry/death/sentry_death.ogg"],
                intrusion: ["modules/johns-cypher-addons/library/SFX/voice/npc/sentry/intrusion/sentry_intrusion.ogg"],
                intrusion_laser: ["modules/johns-cypher-addons/library/SFX/voice/npc/sentry/intrusion_laser/sentry_intrusion_laser.ogg"],
                laser_burst: ["modules/johns-cypher-addons/library/SFX/voice/npc/sentry/laser_burst/sentry_laser_burst.ogg"],
                walk: [
                        "modules/johns-cypher-addons/library/SFX/voice/npc/sentry/walk/sentry_walk_1.ogg",
                        "modules/johns-cypher-addons/library/SFX/voice/npc/sentry/walk/sentry_walk_2.ogg",
                        "modules/johns-cypher-addons/library/SFX/voice/npc/sentry/walk/sentry_walk_3.ogg",
                        "modules/johns-cypher-addons/library/SFX/voice/npc/sentry/walk/sentry_walk_4.ogg",
                        "modules/johns-cypher-addons/library/SFX/voice/npc/sentry/walk/sentry_walk_5.ogg",
                        "modules/johns-cypher-addons/library/SFX/voice/npc/sentry/walk/sentry_walk_6.ogg"
                ]
            },
            desert_kite: {
                spear: [
                        "modules/johns-cypher-addons/library/SFX/voice/npc/desert_kite/spear/desert_kite_spear_1.ogg",
                        "modules/johns-cypher-addons/library/SFX/voice/npc/desert_kite/spear/desert_kite_spear_2.ogg"
                ],
                sting: [
                        "modules/johns-cypher-addons/library/SFX/voice/npc/desert_kite/sting/desert_kite_sting_1.ogg",
                        "modules/johns-cypher-addons/library/SFX/voice/npc/desert_kite/sting/desert_kite_sting_2.ogg",
                        "modules/johns-cypher-addons/library/SFX/voice/npc/desert_kite/sting/desert_kite_sting_3.ogg"
                ]
            },
            komoger: {
                cry: [
                    "modules/johns-cypher-addons/library/SFX/voice/npc/komoger/cry/komoger_cry_1.ogg",
                    "modules/johns-cypher-addons/library/SFX/voice/npc/komoger/cry/komoger_cry_2.ogg"
                ],
                death: ["modules/johns-cypher-addons/library/SFX/voice/npc/komoger/death/komoger_death.ogg"],
                infectious_bite: ["modules/johns-cypher-addons/library/SFX/voice/npc/komoger/infectious_bite/komoger_infectious_bite.ogg"],
                tail: ["modules/johns-cypher-addons/library/SFX/voice/npc/komoger/tail/komoger_tail.ogg"],
                claw: {
                    cast: [
                        "modules/johns-cypher-addons/library/SFX/voice/npc/komoger/claw/cast/komoger_claw_1.ogg",
                        "modules/johns-cypher-addons/library/SFX/voice/npc/komoger/claw/cast/komoger_claw_2.ogg"
                    ],
                    hit: [
                        "modules/johns-cypher-addons/library/SFX/voice/npc/komoger/claw/hit/komoger_claw_hit_1.ogg",
                        "modules/johns-cypher-addons/library/SFX/voice/npc/komoger/claw/hit/komoger_claw_hit_2.ogg"
                    ]
                }
            },
            phalanoceros: {
                cry: ["modules/johns-cypher-addons/library/SFX/voice/npc/phalanoceros/cry/phalanocero_cry.ogg"],
                repulsive_horn: ["modules/johns-cypher-addons/library/SFX/voice/npc/phalanoceros/repulsive_horn/phalanocero_repulsive_horn.ogg"]
            },
            pankavora: {
                tail_slap: [
                            "modules/johns-cypher-addons/library/SFX/voice/npc/pankavora/tail_slap/pankavora_tail_slap.ogg"
                            ],
                scale_shot: {
                    cast: ["modules/johns-cypher-addons/library/SFX/voice/npc/pankavora/scale_shot/cast/pankavora_scale_shot_cast.ogg"],
                    hit: [
                        "modules/johns-cypher-addons/library/SFX/voice/npc/pankavora/scale_shot/hit/pankavora_scale_shot_hit_1.ogg",
                        "modules/johns-cypher-addons/library/SFX/voice/npc/pankavora/scale_shot/hit/pankavora_scale_shot_hit_2.ogg",
                        "modules/johns-cypher-addons/library/SFX/voice/npc/pankavora/scale_shot/hit/pankavora_scale_shot_hit_3.ogg",
                        "modules/johns-cypher-addons/library/SFX/voice/npc/pankavora/scale_shot/hit/pankavora_scale_shot_hit_4.ogg"
                    ]
                }
            },
            dontalodon: {
                entangle: ["modules/johns-cypher-addons/library/SFX/voice/npc/dontalodon/entangle/entangle.ogg"],
                stomp: {
                    cast: ["modules/johns-cypher-addons/library/SFX/voice/npc/dontalodon/stomp/cast/stomp_cast.ogg"],
                    hit: ["modules/johns-cypher-addons/library/SFX/voice/npc/dontalodon/stomp/hit/stomp_hit.ogg"]
                },
                gore: ["modules/johns-cypher-addons/library/SFX/voice/npc/dontalodon/gore/gore.ogg"]
            },
            thar: {
                cry: [
                    "modules/johns-cypher-addons/library/SFX/voice/npc/thar/cry/thar_cry_1.ogg",
                    "modules/johns-cypher-addons/library/SFX/voice/npc/thar/cry/thar_cry_2.ogg",
                    "modules/johns-cypher-addons/library/SFX/voice/npc/thar/cry/thar_cry_3.ogg",
                    "modules/johns-cypher-addons/library/SFX/voice/npc/thar/cry/thar_cry_4.ogg",
                    "modules/johns-cypher-addons/library/SFX/voice/npc/thar/cry/thar_cry_5.ogg"
                ],
                death: ["modules/johns-cypher-addons/library/SFX/voice/npc/thar/death/thar_death.ogg"],
                tackle: {
                    cast: ["modules/johns-cypher-addons/library/SFX/voice/npc/thar/tackle/cast/thar_tackle_cast.ogg"],
                    hit: ["modules/johns-cypher-addons/library/SFX/voice/npc/thar/tackle/cast/thar_tackle_hit.ogg"]
                }
            },
            nanospectre: {
                detonate: ["modules/johns-cypher-addons/library/SFX/voice/npc/nanospectre/detonate/detonate.ogg"]
            }
        }
    },
    ambient: {
        environment: {},
        trap:{},
        mechanism: {},
        footsteps: {}
    },
    interaction: {
        switch: {},
        door: {},
        container: {}
    },
    items: {
        acid: ["modules/johns-cypher-addons/library/SFX/item/acid/acid_1.ogg"],
        cloak: ["modules/johns-cypher-addons/library/SFX/item/cloak/cloak_1.ogg"],
        electricity: {
            charge: [
                "modules/johns-cypher-addons/library/SFX/item/electricity/charge/electricity_charge_1.ogg",
                "modules/johns-cypher-addons/library/SFX/item/electricity/charge/electricity_charge_2.ogg",
                "modules/johns-cypher-addons/library/SFX/item/electricity/charge/electricity_charge_3.ogg",
                "modules/johns-cypher-addons/library/SFX/item/electricity/charge/electricity_charge_4.ogg",
                "modules/johns-cypher-addons/library/SFX/item/electricity/charge/electricity_charge_5.ogg",
                "modules/johns-cypher-addons/library/SFX/item/electricity/charge/electricity_charge_6.ogg",
                "modules/johns-cypher-addons/library/SFX/item/electricity/charge/electricity_charge_7.ogg",
                "modules/johns-cypher-addons/library/SFX/item/electricity/charge/electricity_charge_8.ogg"
            ],
            cast: [
                "modules/johns-cypher-addons/library/SFX/item/electricity/cast/electricity_cast_1.ogg",
                "modules/johns-cypher-addons/library/SFX/item/electricity/cast/electricity_cast_2.ogg",
                "modules/johns-cypher-addons/library/SFX/item/electricity/cast/electricity_cast_3.ogg"
            ]
        },
        flash: ["modules/johns-cypher-addons/library/SFX/item/flash/flash_1.ogg"],
        glass: [
                "modules/johns-cypher-addons/library/SFX/item/glass/glass_shatter_1.ogg",
                "modules/johns-cypher-addons/library/SFX/item/glass/glass_shatter_2.ogg",
                "modules/johns-cypher-addons/library/SFX/item/glass/glass_shatter_3.ogg"
        ]
        
    },
    ability: {
        action: {
            spend_calamity: ["modules/johns-cypher-addons/library/SFX/ability/action/spend_calamity/spend_calamity.ogg"],
            spawn: ["modules/johns-cypher-addons/library/SFX/ability/action/spawn/spawn.ogg"],
            charge: ["modules/johns-cypher-addons/library/SFX/ability/action/charge/charge.ogg"],
            discharge: ["modules/johns-cypher-addons/library/SFX/ability/action/discharge/discharge.ogg"],
            broadcast: {
                cast: ["modules/johns-cypher-addons/library/SFX/ability/action/broadcast/broadcast_cast.ogg"],
                break: ["modules/johns-cypher-addons/library/SFX/ability/action/broadcast/broadcast_break.ogg"]
            },
            hedge_magic: ["modules/johns-cypher-addons/library/SFX/ability/action/hedge_magic/hedge_magic.ogg"],
            critical_reaction: {
                cast: ["modules/johns-cypher-addons/library/SFX/ability/action/critical_reaction/critical_reaction_cast.ogg"],
                end: ["modules/johns-cypher-addons/library/SFX/ability/action/critical_reaction/critical_reaction_end.ogg"]
            },
            throw: ["modules/johns-cypher-addons/library/SFX/ability/action/throw/throw.ogg"],
            warcry: ["modules/johns-cypher-addons/library/SFX/ability/action/war_cry/war_cry.ogg"],
            mantra: [
                        "modules/johns-cypher-addons/library/SFX/ability/action/mantra/mantra_jaho.ogg",
                        "modules/johns-cypher-addons/library/SFX/ability/action/mantra/mantra_kra.ogg",
                        "modules/johns-cypher-addons/library/SFX/ability/action/mantra/mantra_lohk.ogg",
                        "modules/johns-cypher-addons/library/SFX/ability/action/mantra/mantra_netra.ogg",
                        "modules/johns-cypher-addons/library/SFX/ability/action/mantra/mantra_ris.ogg",
                        "modules/johns-cypher-addons/library/SFX/ability/action/mantra/mantra_vaas.ogg",
                        "modules/johns-cypher-addons/library/SFX/ability/action/mantra/mantra_vom.ogg",
                        "modules/johns-cypher-addons/library/SFX/ability/action/mantra/mantra_zata.ogg"
            ],
            heal: ["modules/johns-cypher-addons/library/SFX/ability/action/heal/heal.ogg"],
            enervate: [
                    "modules/johns-cypher-addons/library/SFX/ability/action/enervate/enervate_1.ogg",
                    "modules/johns-cypher-addons/library/SFX/ability/action/enervate/enervate_2.ogg",
                    "modules/johns-cypher-addons/library/SFX/ability/action/enervate/enervate_3.ogg",
                    "modules/johns-cypher-addons/library/SFX/ability/action/enervate/enervate_4.ogg"
            ],
            blood_wine: [
                    "modules/johns-cypher-addons/library/SFX/ability/action/blood_wine/blood_wine_1.ogg",
                    "modules/johns-cypher-addons/library/SFX/ability/action/blood_wine/blood_wine_2.ogg",
                    "modules/johns-cypher-addons/library/SFX/ability/action/blood_wine/blood_wine_3.ogg",
                    "modules/johns-cypher-addons/library/SFX/ability/action/blood_wine/blood_wine_4.ogg"
            ],
            enrich_gem: ["modules/johns-cypher-addons/library/SFX/ability/action/enrich_gem/enrich_gem.ogg"],
            fire_and_ice: [
                        "modules/johns-cypher-addons/library/SFX/ability/action/fire_and_ice/ice.ogg",
                        "modules/johns-cypher-addons/library/SFX/ability/action/fire_and_ice/fire.ogg"
            ],
            stasis: [
                    "modules/johns-cypher-addons/library/SFX/ability/action/stasis/stasis_cast.ogg",
                    "modules/johns-cypher-addons/library/SFX/ability/action/stasis/stasis_hit.ogg"
                    ],
            tear: ["modules/johns-cypher-addons/library/SFX/ability/action/tear/tear.ogg"],
            headbite: ["modules/johns-cypher-addons/library/SFX/ability/action/headbite/headbite.ogg"],
            tail_stinger: ["modules/johns-cypher-addons/library/SFX/ability/action/tail_stinger/tail_stinger.ogg"]

        },
        enabler: {
            absorb_calamity: ["modules/johns-cypher-addons/library/SFX/ability/enabler/absorb_calamity/absorb_calamity.ogg"],
            duplicity: ["modules/johns-cypher-addons/library/SFX/ability/enabler/duplicity/duplicity.ogg"],
            frenzy: ["modules/johns-cypher-addons/library/SFX/ability/enabler/frenzy/frenzy.ogg"],
            decompile: ["modules/johns-cypher-addons/library/SFX/ability/enabler/decompile/decompile.ogg"],
            immunity: ["modules/johns-cypher-addons/library/SFX/ability/enabler/immunity/immunity.ogg"]
        }
    },
    weapon: {
        melee: {
            special: {
                spores: [
                            "modules/johns-cypher-addons/library/SFX/weapon/melee/special/spores/special_spores_1.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/melee/special/spores/special_spores_2.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/melee/special/spores/special_spores_3.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/melee/special/spores/special_spores_4.ogg"
                ]
            },
            slashing: {
                impact: {
                    armor: [
                        "modules/johns-cypher-addons/library/SFX/weapon/melee/slashing/impacts/armor/slashing_impact_armor_1.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/melee/slashing/impacts/armor/slashing_impact_armor_2.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/melee/slashing/impacts/armor/slashing_impact_armor_3.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/melee/slashing/impacts/armor/slashing_impact_armor_4.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/melee/slashing/impacts/armor/slashing_impact_armor_5.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/melee/slashing/impacts/armor/slashing_impact_armor_6.ogg"
                    ],
                    flesh: [
                        "modules/johns-cypher-addons/library/SFX/weapon/melee/slashing/impacts/flesh/slashing_impact_flesh_1.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/melee/slashing/impacts/flesh/slashing_impact_flesh_2.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/melee/slashing/impacts/flesh/slashing_impact_flesh_3.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/melee/slashing/impacts/flesh/slashing_impact_flesh_4.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/melee/slashing/impacts/flesh/slashing_impact_flesh_5.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/melee/slashing/impacts/flesh/slashing_impact_flesh_6.ogg"
                    ],
                },
                swings: {
                    light: {
                        
                    },
                    medium: {
                        sword: [
                                "modules/johns-cypher-addons/library/SFX/weapon/melee/slashing/swings/medium/sword/slashing_swing_medium_sword_1.ogg",
                                "modules/johns-cypher-addons/library/SFX/weapon/melee/slashing/swings/medium/sword/slashing_swing_medium_sword_2.ogg",
                                "modules/johns-cypher-addons/library/SFX/weapon/melee/slashing/swings/medium/sword/slashing_swing_medium_sword_3.ogg",
                                "modules/johns-cypher-addons/library/SFX/weapon/melee/slashing/swings/medium/sword/slashing_swing_medium_sword_4.ogg",
                                "modules/johns-cypher-addons/library/SFX/weapon/melee/slashing/swings/medium/sword/slashing_swing_medium_sword_5.ogg",
                                "modules/johns-cypher-addons/library/SFX/weapon/melee/slashing/swings/medium/sword/slashing_swing_medium_sword_6.ogg",
                                "modules/johns-cypher-addons/library/SFX/weapon/melee/slashing/swings/medium/sword/slashing_swing_medium_sword_7.ogg",
                                "modules/johns-cypher-addons/library/SFX/weapon/melee/slashing/swings/medium/sword/slashing_swing_medium_sword_8.ogg"
                        ]
                    },
                    heavy: {}
                }
            },
            piercing: {
                impact: {
                    armor: [
                            "modules/johns-cypher-addons/library/SFX/weapon/melee/piercing/impacts/armor/piercing_impact_armor_1.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/melee/piercing/impacts/armor/piercing_impact_armor_2.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/melee/piercing/impacts/armor/piercing_impact_armor_3.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/melee/piercing/impacts/armor/piercing_impact_armor_4.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/melee/piercing/impacts/armor/piercing_impact_armor_5.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/melee/piercing/impacts/armor/piercing_impact_armor_6.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/melee/piercing/impacts/armor/piercing_impact_armor_7.ogg"
                    ],
                    flesh: [
                            "modules/johns-cypher-addons/library/SFX/weapon/melee/piercing/impacts/flesh/piercing_impact_flesh_1.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/melee/piercing/impacts/flesh/piercing_impact_flesh_2.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/melee/piercing/impacts/flesh/piercing_impact_flesh_3.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/melee/piercing/impacts/flesh/piercing_impact_flesh_4.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/melee/piercing/impacts/flesh/piercing_impact_flesh_5.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/melee/piercing/impacts/flesh/piercing_impact_flesh_6.ogg"
                    ]
                },
                swings: {
                    light: {
                        dagger: [
                            "modules/johns-cypher-addons/library/SFX/weapon/melee/piercing/swings/light/dagger/piercing_swing_light_dagger_1.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/melee/piercing/swings/light/dagger/piercing_swing_light_dagger_2.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/melee/piercing/swings/light/dagger/piercing_swing_light_dagger_3.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/melee/piercing/swings/light/dagger/piercing_swing_light_dagger_4.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/melee/piercing/swings/light/dagger/piercing_swing_light_dagger_5.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/melee/piercing/swings/light/dagger/piercing_swing_light_dagger_6.ogg"
                            
                        ],
                        crush_grip: [
                            "modules/johns-cypher-addons/library/SFX/weapon/melee/piercing/swings/light/crush_grip/piercing_swing_light_crushgrip_1.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/melee/piercing/swings/light/crush_grip/piercing_swing_light_crushgrip_2.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/melee/piercing/swings/light/crush_grip/piercing_swing_light_crushgrip_3.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/melee/piercing/swings/light/crush_grip/piercing_swing_light_crushgrip_4.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/melee/piercing/swings/light/crush_grip/piercing_swing_light_crushgrip_5.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/melee/piercing/swings/light/crush_grip/piercing_swing_light_crushgrip_6.ogg"
                        ]
                    },
                    medium: {
                        spear: [
                            "modules/johns-cypher-addons/library/SFX/weapon/melee/piercing/swings/medium/spear/piercing_swing_medium_spear_1.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/melee/piercing/swings/medium/spear/piercing_swing_medium_spear_2.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/melee/piercing/swings/medium/spear/piercing_swing_medium_spear_3.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/melee/piercing/swings/medium/spear/piercing_swing_medium_spear_4.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/melee/piercing/swings/medium/spear/piercing_swing_medium_spear_5.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/melee/piercing/swings/medium/spear/piercing_swing_medium_spear_6.ogg"
                        ]
                    },
                    heavy: {}
                }
            },
            bludgeoning: {
                impact: {
                    armor: [
                        "modules/johns-cypher-addons/library/SFX/weapon/melee/bludgeoning/impacts/armor/bludgeoning_impact_armor_1.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/melee/bludgeoning/impacts/armor/bludgeoning_impact_armor_2.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/melee/bludgeoning/impacts/armor/bludgeoning_impact_armor_3.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/melee/bludgeoning/impacts/armor/bludgeoning_impact_armor_4.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/melee/bludgeoning/impacts/armor/bludgeoning_impact_armor_5.ogg"
                    ],
                    flesh: [
                        "modules/johns-cypher-addons/library/SFX/weapon/melee/bludgeoning/impacts/flesh/bludgeoning_impact_flesh_1.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/melee/bludgeoning/impacts/flesh/bludgeoning_impact_flesh_2.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/melee/bludgeoning/impacts/flesh/bludgeoning_impact_flesh_3.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/melee/bludgeoning/impacts/flesh/bludgeoning_impact_flesh_4.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/melee/bludgeoning/impacts/flesh/bludgeoning_impact_flesh_5.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/melee/bludgeoning/impacts/flesh/bludgeoning_impact_flesh_6.ogg"
                    ]
                },
                swings: {
                    light: {},
                    medium: {
                        hydraulic_punch: ["modules/johns-cypher-addons/library/SFX/weapon/melee/bludgeoning/swings/medium/hydraulic_punch/hydraulic_punch.ogg"]
                    },
                    heavy: {}
                }
            }
        },
        ranged: {
            gun: {
                pistol: {
                    fire: [
                            "modules/johns-cypher-addons/library/SFX/weapon/ranged/gun/pistol/fire/ranged_gun_pistol_fire_1.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/ranged/gun/pistol/fire/ranged_gun_pistol_fire_2.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/ranged/gun/pistol/fire/ranged_gun_pistol_fire_3.ogg"
                    ]
                }
            },
            archery: {
                bow: {
                    draw: [
                        "modules/johns-cypher-addons/library/SFX/weapon/ranged/archery/bow/draw/archery_bow_draw_1.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/ranged/archery/bow/draw/archery_bow_draw_2.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/ranged/archery/bow/draw/archery_bow_draw_3.ogg"
                    ],
                    fire: [
                        "modules/johns-cypher-addons/library/SFX/weapon/ranged/archery/bow/fire/archery_bow_fire_1.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/ranged/archery/bow/fire/archery_bow_fire_2.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/ranged/archery/bow/fire/archery_bow_fire_3.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/ranged/archery/bow/fire/archery_bow_fire_4.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/ranged/archery/bow/fire/archery_bow_fire_5.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/ranged/archery/bow/fire/archery_bow_fire_6.ogg"
                    ],
                    impact: {
                        armor: [
                            "modules/johns-cypher-addons/library/SFX/weapon/ranged/archery/bow/impact/armor/archery_bow_impact_armor_1.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/ranged/archery/bow/impact/armor/archery_bow_impact_armor_2.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/ranged/archery/bow/impact/armor/archery_bow_impact_armor_3.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/ranged/archery/bow/impact/armor/archery_bow_impact_armor_4.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/ranged/archery/bow/impact/armor/archery_bow_impact_armor_5.ogg"
                        ],
                        flesh: [
                            "modules/johns-cypher-addons/library/SFX/weapon/ranged/archery/bow/impact/flesh/archery_bow_impact_flesh_1.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/ranged/archery/bow/impact/flesh/archery_bow_impact_flesh_2.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/ranged/archery/bow/impact/flesh/archery_bow_impact_flesh_3.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/ranged/archery/bow/impact/flesh/archery_bow_impact_flesh_4.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/ranged/archery/bow/impact/flesh/archery_bow_impact_flesh_5.ogg"
                        ]
                    },
                    miss: [
                        "modules/johns-cypher-addons/library/SFX/weapon/ranged/archery/bow/miss/archery_bow_miss_1.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/ranged/archery/bow/miss/archery_bow_miss_2.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/ranged/archery/bow/miss/archery_bow_miss_3.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/ranged/archery/bow/miss/archery_bow_miss_4.ogg"
                    ],
                    whizzby: [
                        "modules/johns-cypher-addons/library/SFX/weapon/ranged/archery/bow/whizzby/archery_bow_whizzby_1.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/ranged/archery/bow/whizzby/archery_bow_whizzby_2.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/ranged/archery/bow/whizzby/archery_bow_whizzby_3.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/ranged/archery/bow/whizzby/archery_bow_whizzby_4.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/ranged/archery/bow/whizzby/archery_bow_whizzby_5.ogg"
                    ]
                },
                crossbow: {
                    fire: [
                        "modules/johns-cypher-addons/library/SFX/weapon/ranged/archery/crossbow/fire/archery_crossbow_fire_1.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/ranged/archery/crossbow/fire/archery_crossbow_fire_2.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/ranged/archery/crossbow/fire/archery_crossbow_fire_3.ogg"
                    ]
                }
            },
            energy: {
                laser: {
                    fire: [
                            "modules/johns-cypher-addons/library/SFX/weapon/ranged/energy/laser/fire/ranged_energy_laser_fire_1.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/ranged/energy/laser/fire/ranged_energy_laser_fire_2.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/ranged/energy/laser/fire/ranged_energy_laser_fire_3.ogg"
                    ],
                    impact: []
                },
                onslaught: {
                    charge: ["modules/johns-cypher-addons/library/SFX/weapon/ranged/energy/onslaught/charge/onslaught_charge.ogg"],
                    cast: [
                        "modules/johns-cypher-addons/library/SFX/weapon/ranged/energy/onslaught/cast/onslaught_cast_1.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/ranged/energy/onslaught/cast/onslaught_cast_2.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/ranged/energy/onslaught/cast/onslaught_cast_3.ogg",
                    ],
                    pulse: ["modules/johns-cypher-addons/library/SFX/weapon/ranged/energy/onslaught/pulse/onslaught_pulse.ogg"]
                }
            }
        }
    }
}