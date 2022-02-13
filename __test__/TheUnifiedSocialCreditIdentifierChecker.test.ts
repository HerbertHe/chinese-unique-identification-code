import { TheUnifiedSocialCreditIdentifierChecker } from "../src/TheUnifiedSocialCreditIdentifier"

test("The Unified Social Credit Identifier check should be passed!", () => {
	const res = TheUnifiedSocialCreditIdentifierChecker("9135052155323005XL")
	expect(res[0]).toBe(true)
})
