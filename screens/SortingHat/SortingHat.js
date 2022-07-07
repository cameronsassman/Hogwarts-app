import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, Pressable, ImageBackground } from 'react-native';

import { colors } from '../../constants/styles';
import Button from '../../components/UI/Button';
import FlatButton from '../../components/UI/FlatButton';

import questions from '../../components/SortingHat/quizQuestions'
import Houses from '../Hogwarts/Houses';

function SortingHat({navigation}) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
	
	// Total score per house setters
	const [totalGryffindor, setGryffindor] = useState(0);
	const [totalSlytherin, setSlytherin] = useState(0);
	const [totalRavenclaw, setRavenclaw] = useState(0);
	const [totalHufflepuff, setHufflepuff] = useState(0);

	//Final result setter
	const [house, setHouse] = useState("Gryffindor");

	const [showQuiz, setShowQuiz] = useState(false);
	const [showHouse, setShowHouse] = useState(false);

    	//Sorting function
	const answerHandler = (type) => {

		setHouse(type)
		switch(type){ 
			case "Gryffindor": setGryffindor(type) 
				break;
			case "Slytherin": setSlytherin(type) 
				break;
			case "Ravenclaw": setRavenclaw(type) 
				break;
			case "Hufflepuff": setHufflepuff(type) 
				break;
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowHouse(true);
		}
	};
	const changeBackground = () => {
		if (house === 'Gryffindor' && showHouse===true) {
			return(require("../../assets/Hogwarts/Houses/Gryffindor.jpeg"));}
		if (house === 'Slytherin' && showHouse===true) {
			return(require("../../assets/Hogwarts/Houses/slytherin.jpeg"));}
		if (house === 'Ravenclaw' && showHouse===true) {
			return(require("../../assets/Hogwarts/Houses/ravenclaw.jpeg"));}
		if (house === 'Hufflepuff' && showHouse===true) {
			return(require("../../assets/Hogwarts/Houses/hufflepuf.jpeg"));}
	};

    return (
        <>
			<View style={styles.container}>
				<ImageBackground source={changeBackground()}  style={styles.bgimage}>

					{showQuiz ? (
						<View>
							{showHouse ? (
								<View style={styles.button}>
									<Button onPress={() => navigation.navigate('Hogwarts Houses')}>
										<Text>House Information</Text>
									</Button>
								</View>
							) : (
								<>
									<View style={styles.questions} key={questions.id} >
										<Image
										style={styles.houses}
										source={require('../../assets/Hogwarts/House.png')} />
										<Text style={styles.count}>Question {currentQuestion + 1}/{questions.length}</Text>
										<View>
											<Text style={styles.question}>{questions[currentQuestion].question}</Text>
										</View>
									</View>
									<View style={styles.answers}>
										{questions[currentQuestion].answers.map((answer) => (
											<FlatButton onPress={() => {answerHandler(answer.type);}} >
												<Text>{ answer.content }</Text>
											</FlatButton>
											// console.log(answer)
										))}
									</View>
								</>
							)}
						</View>
					) : (
						<>
							<View style={styles.card1}>
								<Image
									style={styles.mrs}
									source={require('../../assets/Hogwarts/SortingHat.png')} />
								<Button onPress={() => setShowQuiz(true)}>
									<Text>Begin</Text>
								</Button>
							</View>
						</>
					)}
				</ImageBackground>
			</View>
        </>
    )
}

export default SortingHat

const styles = StyleSheet.create({
	mrs: {
		width: '100%',
		height: 250,
		borderBottomRightRadius: 30,
		borderTopLeftRadius: 30
	},
	houses: {
		width: '100%',
		height: 260,
		marginBottom: 20
	},
	card1: {
		width: 300,
		marginStart: '15%',
		marginTop: '45%'
	},
	container: {
		backgroundColor: colors.sorting,
		width: '100%',
	},
	questions: {
		width: '100%',
		position: 'relative',
		paddingTop: '10%',
    	paddingHorizontal: 40,
	},
	count: {
		fontSize: 20,
		color: colors.primary100,
		paddingHorizontal: '30%',
		paddingBottom: 15
	},
	question: {
		color: colors.primary100,
		fontSize: 18,
		marginBottom: 20
	},
	answers: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		paddingHorizontal: '15%',
	},
	bgimage: {
		height: '100%',
		width: '100%', 
		top: 0, 
		left: 0,
	},
	button: {
		marginTop: 550,
		paddingHorizontal: 30,
		justifyContent: 'center',
		alignContent: 'center'
	}
})