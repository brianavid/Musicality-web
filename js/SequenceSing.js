window.onload = function () {
	Musicality_Initialise()
	
	document.querySelector('#buttonNew').addEventListener('click', onNew);

	document.querySelectorAll('.keyChoice').forEach(option => option.addEventListener('click',handleKeyChoiceSelected));
	document.querySelectorAll('.mode').forEach(option => option.addEventListener('click',handleModeSelected));
};

function onNew() {
	document.querySelector('#buttonNew').removeEventListener('click', onNew);
	document.querySelector('#buttonAgain').addEventListener('click', onRepeat);
	document.querySelector('#buttonAnswer').addEventListener('click', onAnswer);
	document.querySelector('#buttonNew').classList.add("disabled");
	document.querySelector('#buttonAgain').classList.remove("disabled");
	document.querySelector('#buttonAnswer').classList.remove("disabled");
	document.querySelector('#answerText').innerHTML  = "";
	var length = document.querySelector('#seqLen').value;
	var keyChoice = document.querySelector('#keyChoice').innerHTML;
	var key = Musicality_NoteNames.findIndex(n => n.Name1 == keyChoice || n.Name2 == keyChoice)
	var mode = document.querySelector('#mode').innerHTML;
	var instructions = Musicality_ShowSequenceToSing(+length, key, mode);
	document.querySelector('#instructions').innerHTML  = instructions;
}

function onRepeat() {
	Musicality_ReplayStartNotes();
}

function onAnswer() {
	document.querySelector('#buttonNew').addEventListener('click', onNew);
	document.querySelector('#buttonNew').classList.remove("disabled");
	document.querySelector('#answerText').innerHTML  = Musicality_PlayAnswerNotes();
}

function handleKeyChoiceSelected(e) {
	var choice = e.target.innerHTML;
	document.querySelector('#keyChoice').innerHTML = choice;
}

function handleModeSelected(e) {
	var choice = e.target.innerHTML;
	document.querySelector('#mode').innerHTML = choice;
}

