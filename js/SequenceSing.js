window.onload = function () {
	Musicality_Initialise()
	
	document.querySelector('#buttonNew').addEventListener('click', onNew);

	document.querySelectorAll('.keyChoice').forEach(option => option.addEventListener('click',handleKeyChoiceSelected));
	document.querySelectorAll('.mode').forEach(option => option.addEventListener('click',handleModeSelected));
	document.querySelectorAll('.difficulty').forEach(option => option.addEventListener('click',handleDifficultySelected));
	
	document.querySelector('#seqLen').value = parseInt(window.localStorage.getItem("seqLen") || '8');
	document.querySelector('#keyChoice').innerHTML = window.localStorage.getItem("keyChoice") || 'C';
	document.querySelector('#mode').innerHTML = window.localStorage.getItem("mode") || 'Major';
	document.querySelector('#difficulty').innerHTML = window.localStorage.getItem("difficulty") || 'Stepwise';
	document.getElementById("useKeySig").checked = window.localStorage.getItem("useKeySig") == "true";
	if (document.querySelector('#difficulty').innerHTML == "Sequential")
		document.querySelector('#difficulty').innerHTML = "Stepwise";
};

function onNew() {
	//document.querySelector('#buttonNew').removeEventListener('click', onNew);
	document.querySelector('#buttonAgain').addEventListener('click', onRepeat);
	document.querySelector('#buttonAnswer').addEventListener('click', onAnswer);
	//document.querySelector('#buttonNew').classList.add("disabled");
	document.querySelector('#buttonAgain').classList.remove("disabled");
	document.querySelector('#buttonAnswer').classList.remove("disabled");
	document.querySelector('#answerText').innerHTML  = "";
	var length = document.querySelector('#seqLen').value;
	var keyChoice = document.querySelector('#keyChoice').innerHTML;
	var key = Musicality_NoteNames.findIndex(n => n.Name1 == keyChoice || n.Name2 == keyChoice)
	var mode = document.querySelector('#mode').innerHTML;
	var difficulty = document.querySelector('#difficulty').innerHTML;
	var instructions = Musicality_ShowSequenceToSing(+length, key, mode, difficulty, document.getElementById("useKeySig").checked);
	document.querySelector('#instructions').innerHTML  = instructions;
	
	window.localStorage.setItem("seqLen", length);
	window.localStorage.setItem("keyChoice", keyChoice);
	window.localStorage.setItem("mode", mode);
	window.localStorage.setItem("difficulty", difficulty);
	window.localStorage.setItem("useKeySig", document.getElementById("useKeySig").checked.toString());
}

function onRepeat() {
	Musicality_ReplayStartNotes();
}

function onAnswer() {
	//document.querySelector('#buttonNew').addEventListener('click', onNew);
	//document.querySelector('#buttonNew').classList.remove("disabled");
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

function handleDifficultySelected(e) {
	var choice = e.target.innerHTML;
	document.querySelector('#difficulty').innerHTML = choice;
}

