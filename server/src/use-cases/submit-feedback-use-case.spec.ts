import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy =  jest.fn();
const sendmailSpy = jest.fn();

const submiFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendmailSpy }
)

describe('Submit feedback', () =>{
    it('shoud be able to submit a feedback', async () => {
        await expect(submiFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'data:image/png;base64, safasdfafeerqr',
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendmailSpy).toHaveBeenCalled();
    });

    it('shoud not be ablle to submit feedback without type', async () => {
        await expect(submiFeedback.execute({
            type: '',
            comment: 'example comment',
            screenshot: 'data:image/png;base64, safasdfafeerqr',
        })).rejects.toThrow();
    });

    it('shoud not be ablle to submit feedback without comment', async () => {
        await expect(submiFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64, safasdfafeerqr',
        })).rejects.toThrow();
    });

    it('shoud not be ablle to submit feedback with an invalid screenshot', async () => {
        await expect(submiFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'test.jpg',
        })).rejects.toThrow();
    });
});