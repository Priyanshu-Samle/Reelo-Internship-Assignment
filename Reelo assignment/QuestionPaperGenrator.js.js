// questionStore.js
class QuestionStore {
    constructor() {
      this.questions = [];
    }
  
    addQuestion(question, subject, topic, difficulty, marks) {
      this.questions.push({ question, subject, topic, difficulty, marks });
    }
  
    getQuestionsByDifficulty(difficulty) {
      return this.questions.filter((q) => q.difficulty === difficulty);
    }
  }
  
  // questionPaperGenerator.js
  class QuestionPaperGenerator {
    constructor(questionStore) {
      this.questionStore = questionStore;
    }
  
    generateQuestionPaper(totalMarks, difficultyDistribution) {
      const questionPaper = [];
  
      for (const [difficulty, percentage] of Object.entries(difficultyDistribution)) {
        const difficultyQuestions = this.questionStore.getQuestionsByDifficulty(difficulty);
        const numberOfQuestions = Math.ceil((percentage / 100) * totalMarks);
  
        if (numberOfQuestions > difficultyQuestions.length) {
          throw new Error(`Not enough questions available for difficulty: ${difficulty}`);
        }
  
        const selectedQuestions = difficultyQuestions.slice(0, numberOfQuestions);
        questionPaper.push(...selectedQuestions);
      }
  
      return questionPaper;
    }
  }
  
  // main.js
  const questionStore = new QuestionStore();
  const questionPaperGenerator = new QuestionPaperGenerator(questionStore);
  
  // Adding sample questions to the store
  questionStore.addQuestion("What is the speed of light", "Physics", "Waves", "Easy", 5);
  // Add more questions as needed
  
  // Generating question paper
  const totalMarks = 100;
  const difficultyDistribution = { Easy: 20, Medium: 50, Hard: 30 };
  
  try {
    const questionPaper = questionPaperGenerator.generateQuestionPaper(totalMarks, difficultyDistribution);
    console.log("Generated Question Paper:", questionPaper);
  } catch (error) {
    console.error("Error generating question paper:", error.message);
  }
  