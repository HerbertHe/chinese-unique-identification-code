import { TheUnifiedSocialCreditIdentifierInformationExtractor } from "../src/TheUnifiedSocialCreditIdentifier"

test("The Unified Social Credit Identifier extract should be passed!", () => {
    expect(
        TheUnifiedSocialCreditIdentifierInformationExtractor(
            "9135052155323005XL"
        )
    ).toEqual([
        true,
        ["工商", "企业", "350521", "55323005X", "9135052155323005XL"],
    ])
})
