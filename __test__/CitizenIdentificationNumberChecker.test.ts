import { CitizenIdentificationNumberChecker } from "../src/CitizenIdentificationNumber"

test("Citizen Identification Number check should be passed!", () => {
    const res = CitizenIdentificationNumberChecker("440882198503293017")
    expect(res[0]).toBe(true)
})
