/**
 * 法人和其他组织统一社会信用代码编码规则校验器返回值类型
 * The Unified Social Credit Identifier Checker Type
 */
export type TheUnifiedSocialCreditIdentifierCheckerType = [boolean, string]

/**
 * 校验码计算器
 * @param {string} code 前17位代码
 * @returns
 */
const CheckCodeCalculator = (code: string): string => {
    const Chars = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "J",
        "K",
        "L",
        "M",
        "N",
        "P",
        "Q",
        "R",
        "T",
        "U",
        "W",
        "X",
        "Y",
    ]

    const Wi = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28]

    const C18 =
        31 -
        (code
            .split("")
            .map((item) => {
                if (/[0-9]/.test(item)) {
                    return parseInt(item)
                } else {
                    for (const i in Chars) {
                        if (Chars[i] === item) {
                            return 10 + parseInt(i)
                        }
                    }
                }
            })
            .reduce((pre, curr, idx) => {
                return pre + curr * Wi[idx]
            }, 0) %
            31)

    return [...[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], ...Chars][C18].toString()
}

/**
 * 法人和其他组织统一社会信用代码编码规则校验器
 * The Unified Social Credit Identifier Checker
 *
 * @param {string} identifier 统一社会信用代码
 * @returns
 *
 * @description 标准号: GB 32100-2015
 * @link http://openstd.samr.gov.cn/bzgk/gb/newGbInfo?hcno=24691C25985C1073D3A7C85629378AC0
 */
export const TheUnifiedSocialCreditIdentifierChecker = (
    identifier: string
): TheUnifiedSocialCreditIdentifierCheckerType => {
    // check if length of identifier !== 18
    if (identifier.length !== 18) {
        return [false, identifier]
    }

    const IDRegExp =
        /([1-9|A|N|Y]{1})([1-5|9]{1})([0-9]{6})([0-9|A-H|J-N|P-U|W-Y]{9})([0-9|A-H|J-N|P-U|W-Y]{1})/

    if (!IDRegExp.test(identifier)) {
        return [false, identifier]
    }

    if (
        CheckCodeCalculator(identifier.substring(0, 17)) ===
        identifier.substring(17)
    ) {
        return [true, identifier]
    } else {
        return [false, identifier]
    }
}
