import { CitizenIdentificationNumberInformationExtractor } from "../src/CitizenIdentificationNumber"

test("Citizen Identification Number Information extract should be passed!", () => {
    expect(
        CitizenIdentificationNumberInformationExtractor("440882198503293017")
    ).toEqual([true, ["440882", "19850329", "男", "440882198503293017"]])
})
