import Mailgen from 'mailgen';

const mailGenerator = new Mailgen({
  theme: 'salted',
  product: {
    name: 'morgueFile',
    link: 'morguefile',
  },
});

const createEmailHtml = (name, intro, instructions, buttonText, link) => {
  const email = {
    body: {
      name,
      intro,
      action: {
        instructions,
        button: {
          color: '#22BC66',
          text: buttonText,
          link,
        },
      },
    },
  };
  const emailBody = mailGenerator.generate(email);
  return emailBody;
};
export default createEmailHtml;
