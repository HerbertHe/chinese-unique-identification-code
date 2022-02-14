/**
 * 法人和其他组织统一社会信用代码编码规则校验器返回值类型
 * The Unified Social Credit Identifier Checker Type
 */
export type TheUnifiedSocialCreditIdentifierCheckerType = [boolean, string]

const IDRegExp =
    /([1-9|A|N|Y]{1})([1-5|9]{1})([0-9]{6})([0-9|A-H|J-N|P-U|W-Y]{9})([0-9|A-H|J-N|P-U|W-Y]{1})/

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

export const RegistrationDepartmentNames = [
    "机构编制",
    "外交",
    "司法行政",
    "文化",
    "民政",
    "旅游",
    "宗教",
    "工会",
    "工商",
    "中央军委改革和编制办公室",
    "农业",
    "其他",
]

export const RegistrationDepartmentCodes = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "N",
    "Y",
]

export const OrganizationCategories = [
    ["机关", "事业单位", "编办直接管理机构编制的群众团体"],
    ["外国常驻新闻机构"],
    ["律师执业机构", "公证处", "基层法律服务所", "司法鉴定机构", "仲裁委员会"],
    ["外国在华文化中心"],
    ["社会团体", "民办非企业单位", "基金会"],
    ["外国旅游部门常驻代表机构", "港澳台地区旅游部门常驻内地(大陆)代表机构"],
    ["宗教活动场所", "宗教院校"],
    ["基层工会"],
    ["企业", "个体工商户", "农民专业合作社"],
    ["军队事业单位"],
    ["组级集体经济组织", "村级集体经济组织", "乡镇级集体经济组织"],
    [""],
]

export type TheUnifiedSocialCreditIdentifierInformationExtractorDetailsType = [
    string,
    string,
    string,
    string,
    string
]

export type TheUnifiedSocialCreditIdentifierInformationExtractorType = [
    boolean,
    TheUnifiedSocialCreditIdentifierInformationExtractorDetailsType
]

/**
 * 法人和其他组织统一社会信用代码编码规则信息提取器
 * The Unified Social Credit Identifier Information Extractor
 *
 * @param {string} identifier 统一社会信用代码
 * @returns
 *
 * @description 标准号: GB 32100-2015
 * @link http://openstd.samr.gov.cn/bzgk/gb/newGbInfo?hcno=24691C25985C1073D3A7C85629378AC0
 */
export const TheUnifiedSocialCreditIdentifierInformationExtractor = (
    identifier: string
): TheUnifiedSocialCreditIdentifierInformationExtractorType => {
    if (!TheUnifiedSocialCreditIdentifierChecker(identifier)[0]) {
        return [false, null]
    }

    const [id, rd, oc, adc, sic] = IDRegExp.exec(identifier)

    if (
        parseInt(oc) !== 9 &&
        parseInt(oc) >=
            OrganizationCategories[RegistrationDepartmentCodes.indexOf(rd)]
                .length +
                1
    ) {
        return [false, null]
    }

    if (rd === "Y" && oc !== "1") {
        return [false, null]
    }

    const idx = RegistrationDepartmentCodes.indexOf(rd)
    const ocIdx = parseInt(oc) - 1

    if (parseInt(oc) === 9) {
        return [true, [RegistrationDepartmentNames[idx], "其他", adc, sic, id]]
    }

    return [
        true,
        [
            RegistrationDepartmentNames[idx],
            OrganizationCategories[idx][ocIdx],
            adc,
            sic,
            id,
        ],
    ]
}
