window.onload = function () {
	Musicality_Initialise()
	
	document.querySelector('#buttonNew').addEventListener('click', onNew);
	document.querySelectorAll('.recogniseChoice').forEach(option => option.addEventListener('click',handleRecogniseChoiceSelected));
};

function onNew() {
	document.querySelector('#buttonNew').removeEventListener('click', onNew);
	document.querySelector('#buttonAgain').addEventListener('click', onRepeat);
	document.querySelector('#buttonAnswer').addEventListener('click', onAnswer);
	document.querySelector('#buttonNew').classList.add("disabled");
	document.querySelector('#buttonAgain').classList.remove("disabled");
	document.querySelector('#buttonAnswer').classList.remove("disabled");
	document.querySelector('#answerText').innerHTML  = "";
	if (document.querySelector('#recogniseChoice').innerHTML == "Mode and inversion of a chord") {
		Musicality_PickRandomChordToRecognise();
	} else {
		Musicality_PickRandomIntervalToRecognise();
	}
}

function onRepeat() {
	Musicality_ReplayStartNotes();
}

function onAnswer() {
	document.querySelector('#buttonNew').addEventListener('click', onNew);
	document.querySelector('#buttonNew').classList.remove("disabled");
	document.querySelector('#answerText').innerHTML  = Musicality_PlayAnswerNotes();
}
function handleRecogniseChoiceSelected(e) {
	var choice = e.target.innerHTML;
	document.querySelector('#recogniseChoice').innerHTML = choice;
}

