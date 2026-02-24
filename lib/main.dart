import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'GuideFinance',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.pink),
      ),
      home: const HomePage(),
    );
  }
}

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.pink,
      appBar: AppBar(
        backgroundColor: Colors.white,
        title: const Text(
          'GuideFinance',
          style: TextStyle(color: Colors.pink, fontWeight: FontWeight.bold),
        ),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text(
              'GuideFinance',
              style: TextStyle(
                color: Colors.white,
                fontSize: 48,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 40),
            ElevatedButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const QuizPage()),
                );
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.white,
                foregroundColor: Colors.pink,
                padding: const EdgeInsets.symmetric(horizontal: 30, vertical: 15),
              ),
              child: const Text(
                'Commencer le Quiz',
                style: TextStyle(fontSize: 20),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class Question {
  final String questionText;
  final List<String> options;
  final int correctAnswerIndex;

  Question({
    required this.questionText,
    required this.options,
    required this.correctAnswerIndex,
  });
}

class QuizPage extends StatefulWidget {
  const QuizPage({super.key});

  @override
  State<QuizPage> createState() => _QuizPageState();
}

class _QuizPageState extends State<QuizPage> {
  final List<Question> questions = [
    Question(
      questionText: 'Qu\'est-ce que l\'inflation ?',
      options: ['Augmentation générale des prix', 'Diminution des prix', 'Stabilité des prix'],
      correctAnswerIndex: 0,
    ),
    Question(
      questionText: 'Quel est le rôle principal d\'une banque centrale ?',
      options: ['Prêter de l\'argent aux particuliers', 'Contrôler l\'inflation et la politique monétaire', 'Gérer les comptes bancaires'],
      correctAnswerIndex: 1,
    ),
    Question(
      questionText: 'Qu\'est-ce qu\'un budget ?',
      options: ['Un plan financier pour une période donnée', 'Un type d\'investissement', 'Une taxe gouvernementale'],
      correctAnswerIndex: 0,
    ),
    Question(
      questionText: 'Que signifie "diversifier" un portefeuille d\'investissement ?',
      options: ['Investir tout dans une seule action', 'Répartir les investissements dans différents actifs', 'Vendre tous les actifs'],
      correctAnswerIndex: 1,
    ),
    Question(
      questionText: 'Qu\'est-ce qu\'un crédit ?',
      options: ['De l\'argent emprunté à rembourser', 'De l\'argent gagné', 'Une économie réalisée'],
      correctAnswerIndex: 0,
    ),
  ];

  int currentQuestionIndex = 0;
  int score = 0;

  void answerQuestion(int selectedIndex) {
    if (selectedIndex == questions[currentQuestionIndex].correctAnswerIndex) {
      score++;
    }
    setState(() {
      if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
      } else {
        // Quiz finished
        showDialog(
          context: context,
          builder: (context) => AlertDialog(
            title: const Text('Quiz Terminé'),
            content: Text('Votre score: $score / ${questions.length}'),
            actions: [
              TextButton(
                onPressed: () {
                  Navigator.of(context).pop();
                  Navigator.of(context).pop(); // Go back to home
                },
                child: const Text('OK'),
              ),
            ],
          ),
        );
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final question = questions[currentQuestionIndex];
    return Scaffold(
      backgroundColor: Colors.pink,
      appBar: AppBar(
        backgroundColor: Colors.white,
        title: const Text(
          'Quiz Finance',
          style: TextStyle(color: Colors.pink, fontWeight: FontWeight.bold),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              'Question ${currentQuestionIndex + 1} / ${questions.length}',
              style: const TextStyle(color: Colors.white, fontSize: 20),
            ),
            const SizedBox(height: 20),
            Text(
              question.questionText,
              style: const TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.bold),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 40),
            ...question.options.asMap().entries.map((entry) {
              int index = entry.key;
              String option = entry.value;
              return Padding(
                padding: const EdgeInsets.symmetric(vertical: 8.0),
                child: ElevatedButton(
                  onPressed: () => answerQuestion(index),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.white,
                    foregroundColor: Colors.pink,
                    minimumSize: const Size(double.infinity, 50),
                  ),
                  child: Text(option, style: const TextStyle(fontSize: 18)),
                ),
              );
            }),
          ],
        ),
      ),
    );
  }
}
