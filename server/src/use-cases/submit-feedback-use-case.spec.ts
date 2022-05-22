import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const submitFeedback = new SubmitFeedbackUseCase(
    { create: async () => {}},
    { sendMail: async () => {} }
)

const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()

describe('Submit feedback', () => {

    it('should be able submit a feedback', async () => {
        const submitFeedback = new SubmitFeedbackUseCase(
            { create: createFeedbackSpy},
            { sendMail: sendMailSpy }
        )

        await expect(submitFeedback.execute({
            type: 'Bug',
            comment: 'example comment',
            screenshot: 'data:image/png;base64,test.jpg'
        })).resolves.not.toThrow()

        expect(createFeedbackSpy).toHaveBeenCalled()
        expect(sendMailSpy).toHaveBeenCalled()
    })

    it('should not be able to submit a feedback without type', async () => {

        await expect(submitFeedback.execute({
            type: '',
            comment: 'example comment',
            screenshot: 'data:image/png;base64,test.jpg'
        })).rejects.toThrow()
    })

    it('should not be able to submit a feedback without comment', async () => {

        await expect(submitFeedback.execute({
            type: 'Bug',
            comment: '',
            screenshot: 'data:image/png;base64,test.jpg'
        })).rejects.toThrow()
    })

    it('should not be able to submit a feedback with an invalid screenshot', async () => {

        await expect(submitFeedback.execute({
            type: 'Bug',
            comment: 'example comment',
            screenshot: 'test.jpg'
        })).rejects.toThrow()
    })
})