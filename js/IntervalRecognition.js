window.onload = function () {
	Musicality_Initialise()
	
	document.querySelector('#buttonNew').addEventListener('click', onNew);
};

function onNew() {
	document.querySelector('#buttonNew').removeEventListener('click', onNew);
	document.querySelector('#buttonAgain').addEventListener('click', onRepeat);
	document.querySelector('#buttonAnswer').addEventListener('click', onAnswer);
	document.querySelector('#buttonNew').classList.add("disabled");
	document.querySelector('#buttonAgain').classList.remove("disabled");
	document.querySelector('#buttonAnswer').classList.remove("disabled");
	document.querySelector('#answerText').innerHTML  = "";
	Musicality_PickRandomIntervalToRecognise();
}

function onRepeat() {
	Musicality_ReplayStartNotes();
}

function onAnswer() {
	document.querySelector('#buttonNew').addEventListener('click', onNew);
	document.querySelector('#buttonNew').classList.remove("disabled");
	document.querySelector('#answerText').innerHTML  = Musicality_PlayAnswerNotes();
}
