export function makeRequest(stateText, questionsText) {
  let state, questions;
  try {
    state = JSON.parse(stateText);
  } catch {
    throw new Error('state を有効な JSON として入力してください。');
  }
  try {
    questions = JSON.parse(questionsText);
  } catch {
    throw new Error('questions を有効な JSON として入力してください。');
  }
  if (!questions || typeof questions !== 'object' || Array.isArray(questions) || !Object.keys(questions).length) {
    throw new Error('questions には1つ以上の質問を含む JSON オブジェクトを入力してください。');
  }
  return {state, questions};
}
