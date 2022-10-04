# Changelog

## [0.4.2](https://github.com/miyajan/garoon-rest/compare/v0.4.1...v0.4.2) (2022-10-02)

* fix NODE_AUTH_TOKEN to NPM_AUTH_TOKEN for shipjs release ([#87](https://github.com/miyajan/garoon-rest/issues/87)) ([17299ff](https://github.com/miyajan/garoon-rest/commit/17299ff27636a459bb12a209252d04a080505e9b))


## [0.4.1](https://github.com/miyajan/garoon-rest/compare/v0.4.0...v0.4.1) (2022-10-02)

* drop Node v12 support because of the EOL ([#77](https://github.com/miyajan/garoon-rest/issues/77)) ([25357c8](https://github.com/miyajan/garoon-rest/commit/25357c8ed93b0305414828672da504af7e145e85))
* npm audit fix ([#85](https://github.com/miyajan/garoon-rest/issues/85)) ([3b5ace5](https://github.com/miyajan/garoon-rest/commit/3b5ace54f0f56668ebe68830572119be7698e0a7))


## [0.4.0](https://github.com/miyajan/garoon-rest/compare/v0.3.0...v0.4.0) (2020-10-19)


### Bug Fixes

* npm audit fix ([#51](https://github.com/miyajan/garoon-rest/issues/51)) ([cbb882a](https://github.com/miyajan/garoon-rest/commit/cbb882a35a17ceb3f6b2cf23c2b4359a6e18c08b))


### Features

* `base.getOrganizaions` ([#46](https://github.com/miyajan/garoon-rest/issues/46)) ([a4c87cb](https://github.com/miyajan/garoon-rest/commit/a4c87cb4e51db894ef3a38dcf0e4ef9ec4857e2e))
* `base.getUsersByOrganizationID` ([#47](https://github.com/miyajan/garoon-rest/issues/47)) ([3a081b1](https://github.com/miyajan/garoon-rest/commit/3a081b1e128daea42905447e231cd766cb1f2e94))
* `notification.addItem` ([#54](https://github.com/miyajan/garoon-rest/issues/54)) ([42d0f80](https://github.com/miyajan/garoon-rest/commit/42d0f807a537bfea853f5601a72812998039ddcc))
* `notification.getItems` ([#53](https://github.com/miyajan/garoon-rest/issues/53)) ([56e6c85](https://github.com/miyajan/garoon-rest/commit/56e6c853f92848be1bc24c181be5ba26c06a1018))
* `presence.getPresenceByUserCode` ([#49](https://github.com/miyajan/garoon-rest/issues/49)) ([c2b8708](https://github.com/miyajan/garoon-rest/commit/c2b87086e23fbb6822d17cfb85003143039ae121))
* `presence.getPresenceByUserID` ([#48](https://github.com/miyajan/garoon-rest/issues/48)) ([8d60176](https://github.com/miyajan/garoon-rest/commit/8d60176111248fee8a889ad49c1699111166b646))
* `presence.updatePresenceByUserCode` ([#52](https://github.com/miyajan/garoon-rest/issues/52)) ([4c3f905](https://github.com/miyajan/garoon-rest/commit/4c3f905d815ab4415d2f6ed1cc407221d49f7c0f))
* `presence.updatePresenceByUserID` ([#50](https://github.com/miyajan/garoon-rest/issues/50)) ([ee54b93](https://github.com/miyajan/garoon-rest/commit/ee54b93dda3d480d52af8a21a31aca0aa2ebbf11))



## [0.3.0](https://github.com/miyajan/garoon-rest/compare/v0.2.0...v0.3.0) (2020-07-15)


### Features

* `base.getUsers` ([#43](https://github.com/miyajan/garoon-rest/issues/43)) ([b36e14e](https://github.com/miyajan/garoon-rest/commit/b36e14e83a9b80492d4c94624199c2c623296b79))
* `workflow.getFile` ([#42](https://github.com/miyajan/garoon-rest/issues/42)) ([00390a8](https://github.com/miyajan/garoon-rest/commit/00390a8135895635cc244eb23783060484947a40))
* `workflow.getRequests` ([#41](https://github.com/miyajan/garoon-rest/issues/41)) ([ede148c](https://github.com/miyajan/garoon-rest/commit/ede148c2209fcf4acee9159bd46a747c85af333c))



## [0.2.0](https://github.com/miyajan/garoon-rest/compare/v0.1.0...v0.2.0) (2020-07-11)


### Features

* `schedule.addEvent` ([#32](https://github.com/miyajan/garoon-rest/issues/32)) ([6b30524](https://github.com/miyajan/garoon-rest/commit/6b30524592b3620ca398bfaafb006a115bea26d3))
* schedule.deleteEvent ([#35](https://github.com/miyajan/garoon-rest/issues/35)) ([47afcdb](https://github.com/miyajan/garoon-rest/commit/47afcdb2ac6a9216bf61d98bd8faece858e907b8))
* schedule.getFacilities ([#37](https://github.com/miyajan/garoon-rest/issues/37)) ([63ed823](https://github.com/miyajan/garoon-rest/commit/63ed8238b4f3a90250defd47f5ccead6bfff496f))
* schedule.getFacilitiesByFacilityGroupID ([#39](https://github.com/miyajan/garoon-rest/issues/39)) ([fa99c55](https://github.com/miyajan/garoon-rest/commit/fa99c55467eab7f83513d51b8f4a6b580ebae179))
* schedule.getFacilityGroups ([#38](https://github.com/miyajan/garoon-rest/issues/38)) ([a679bc7](https://github.com/miyajan/garoon-rest/commit/a679bc7b2884583168cb125d3b2dd8b24bfb7057))
* schedule.searchAvailableTimes ([#36](https://github.com/miyajan/garoon-rest/issues/36)) ([c8bd788](https://github.com/miyajan/garoon-rest/commit/c8bd7886e9f595db22e3cc2a691b4e7daf1f70f8))
* schedule.updateEvent ([#34](https://github.com/miyajan/garoon-rest/issues/34)) ([e5c6c1b](https://github.com/miyajan/garoon-rest/commit/e5c6c1b8d649df58a0ce3c27334e39c3a0726ad6))



## [0.1.0](https://github.com/miyajan/garoon-rest/compare/v0.0.2...v0.1.0) (2020-06-30)


### Features

* `schedule.getEvents` ([#29](https://github.com/miyajan/garoon-rest/issues/29)) ([6cf5400](https://github.com/miyajan/garoon-rest/commit/6cf5400a93cc5d72c98ad99dd3afd7c899a44477))
* support on-premise environment ([#27](https://github.com/miyajan/garoon-rest/issues/27)) ([4322ca9](https://github.com/miyajan/garoon-rest/commit/4322ca97c3f937ca1b609cb386a68ca4017ea5f6))



## [0.0.2](https://github.com/miyajan/garoon-rest/compare/v0.0.1...v0.0.2) (2020-06-29)


### Bug Fixes

* add documents and add shipjs, and add the `headers` field to `GaroonRestAPIError` ([#2](https://github.com/miyajan/garoon-rest/issues/2)) ([28407e7](https://github.com/miyajan/garoon-rest/commit/28407e7be2548d6c9fa12433f0b88493bb509168))



## 0.0.1 (2020-06-29)

* First Release!
