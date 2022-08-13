window.onload = function () {
	Musicality_Initialise()
	
	document.querySelector('#buttonNew').addEventListener('click', onNew);
	document.getElementById('useKeySig').addEventListener('change', displayStave);

	document.querySelectorAll('.speed').forEach(option => option.addEventListener('click',handleSpeedSelected));
	document.querySelectorAll('.keyChoice').forEach(option => option.addEventListener('click',handleKeyChoiceSelected));
	document.querySelectorAll('.mode').forEach(option => option.addEventListener('click',handleModeSelected));
	document.querySelectorAll('.difficulty').forEach(option => option.addEventListener('click',handleDifficultySelected));
	
	document.querySelector('#seqLen').value = parseInt(window.localStorage.getItem("seqLen") || '8');
	document.querySelector('#keyChoice').innerHTML = window.localStorage.getItem("keyChoice") || 'C';
	document.querySelector('#mode').innerHTML = window.localStorage.getItem("mode") || 'Major';
	document.querySelector('#difficulty').innerHTML = window.localStorage.getItem("difficulty") || 'Stepwise';
	document.querySelector('#speed').innerHTML = window.localStorage.getItem("speed") || "Medium";
	document.getElementById("useKeySig").checked = window.localStorage.getItem("useKeySig") == "true";
};

function onNew() {
	//document.querySelector('#buttonNew').removeEventListener('click', onNew);
	document.querySelector('#buttonAgain').addEventListener('click', onRepeat);
	document.querySelector('#buttonAnswer').addEventListener('click', onAnswer);
	//document.querySelector('#buttonNew').classList.add("disabled");
	document.querySelector('#buttonAgain').classList.remove("disabled");
	document.querySelector('#buttonAnswer').classList.remove("disabled");
	document.querySelector('#answerText').innerHTML  = "";
	document.querySelector('#renderedStaveWithoutKeySig').style.visibility  = 'hidden';
	document.querySelector('#renderedStaveWithKeySig').style.visibility  = 'hidden';
	var length = document.querySelector('#seqLen').value;
	var keyChoice = document.querySelector('#keyChoice').innerHTML;
	var key = Musicality_NoteNames.findIndex(n => n.Name1 == keyChoice || n.Name2 == keyChoice)
	var mode = document.querySelector('#mode').innerHTML;
	var speed = document.querySelector('#speed').innerHTML;
	var difficulty = document.querySelector('#difficulty').innerHTML;
	var instructions = Musicality_PlaySequenceToTranscribe(+length, key, mode, difficulty, speed);
	document.querySelector('#instructions').innerHTML  = instructions;
	displayStave();
	
	window.localStorage.setItem("seqLen", length);
	window.localStorage.setItem("keyChoice", keyChoice);
	window.localStorage.setItem("mode", mode);
	window.localStorage.setItem("speed", speed);
	window.localStorage.setItem("difficulty", difficulty);
}

function displayStave() {
	var renderedStaveWithoutKeySig = document.getElementById('renderedStaveWithoutKeySig');
	var renderedStaveWithKeySig = document.getElementById('renderedStaveWithKeySig');
	if (document.getElementById("useKeySig").checked) {
		renderedStaveWithoutKeySig.style.display = "none";
		renderedStaveWithKeySig.style.display = "block";
	} else {
		renderedStaveWithoutKeySig.style.display = "block";
		renderedStaveWithKeySig.style.display = "none";
	}
	window.localStorage.setItem("useKeySig", document.getElementById("useKeySig").checked.toString());
}

function onRepeat() {
	Musicality_ReplayStartNotes();
}

function onAnswer() {
	//document.querySelector('#buttonNew').addEventListener('click', onNew);
	//document.querySelector('#buttonNew').classList.remove("disabled");
	document.querySelector('#answerText').innerHTML  = Musicality_PlayAnswerNotes();
	document.querySelector('#renderedStaveWithoutKeySig').style.visibility  = 'visible';
	document.querySelector('#renderedStaveWithKeySig').style.visibility  = 'visible';
}

function handleSpeedSelected(e) {
	var choice = e.target.innerHTML;
	document.querySelector('#speed').innerHTML = choice;
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

