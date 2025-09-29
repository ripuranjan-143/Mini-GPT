import Config from './Config.js';
import ExpressError from './ExpressError.js';

const getAIResponse = async (message) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Config.openAiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
    }),
  };
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', options);
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (err) {
    console.error('OpenAI API Error:', err.message);
    throw new ExpressError(500, 'Failed to fetch AI response');
  }
};

export default getAIResponse;
