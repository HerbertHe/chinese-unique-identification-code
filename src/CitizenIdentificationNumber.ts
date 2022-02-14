/**
 * 公民身份号码校验器返回值类型
 * Citizen Identification Number Checker Type
 */
export type CitizenIdentificationNumberCheckerType = [boolean, string]

/**
 * 校验码计算器
 * @param {string} code 前17位代码
 * @returns
 */
const CheckCodeCalculator = (code: string): string => {
    const Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]
    const a1s = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"]
    const a1 =
        a1s[
            code
                .split("")
                .map((item) => parseInt(item))
                .reduce((pre, curr, idx) => {
                    return pre + curr * Wi[idx]
                }, 0) % 11
        ]

    return a1
}

const IDRegExp = /([0-9]{6})([0-9]{8})([0-9]{3})([0-9|X]{1})/

/**
 * 公民身份号码校验器
 * Citizen Identification Number Checker
 *
 * @param {string} id 公民身份号码
 * @returns
 *
 * @description 标准号: GB 11643-1999
 * @link http://openstd.samr.gov.cn/bzgk/gb/newGbInfo?hcno=080D6FBF2BB468F9007657F26D60013E
 */
export const CitizenIdentificationNumberChecker = (
    id: string
): CitizenIdentificationNumberCheckerType => {
    id = id.toUpperCase()

    // check if length of id !== 18
    if (id.length !== 18) {
        return [false, id]
    }

    if (!IDRegExp.test(id)) {
        return [false, id]
    }

    if (CheckCodeCalculator(id.substring(0, 17)) === id.substring(17)) {
        return [true, id]
    } else {
        return [false, id]
    }
}

export type CitizenIdentificationNumberInformationExtractorDetailsType = [
    string,
    string,
    string,
    string
]

export type CitizenIdentificationNumberInformationExtractorType = [
    boolean,
    CitizenIdentificationNumberInformationExtractorDetailsType
]

/**
 * 公民身份号码信息提取器
 * Citizen Identification Number Checker
 *
 * @param {string} id 公民身份号码
 * @returns
 *
 * @description 标准号: GB 11643-1999
 * @link http://openstd.samr.gov.cn/bzgk/gb/newGbInfo?hcno=080D6FBF2BB468F9007657F26D60013E
 */
export const CitizenIdentificationNumberInformationExtractor = (
    id: string
): CitizenIdentificationNumberInformationExtractorType => {
    if (!CitizenIdentificationNumberChecker(id)[0]) {
        return [false, null]
    }

    const [raw, addr, db, or] = IDRegExp.exec(id)

    const gender = parseInt(or) % 2 === 0 ? "女" : "男"

    return [true, [addr, db, gender, raw]]
}
