window.onload = function () {
	Musicality_Initialise()
	
	document.querySelector('#buttonNew').addEventListener('click', onNew);
	document.querySelectorAll('.recogniseChoice').forEach(option => option.addEventListener('click',handleRecogniseChoiceSelected));
	
	var intervals = window.localStorage.getItem("intervals");
	if (intervals) {
		var intArr = intervals.split(",").map(i=>+i);
		document.getElementById("min2").checked = intArr.includes(1);
		document.getElementById("maj2").checked = intArr.includes(2);
		document.getElementById("min3").checked = intArr.includes(3);
		document.getElementById("maj3").checked = intArr.includes(4);
		document.getElementById("per4").checked = intArr.includes(5);
		document.getElementById("tri").checked = intArr.includes(6);
		document.getElementById("per5").checked = intArr.includes(7);
		document.getElementById("min6").checked = intArr.includes(8);
		document.getElementById("maj6").checked = intArr.includes(9);
		document.getElementById("min7").checked = intArr.includes(10);
		document.getElementById("maj7").checked = intArr.includes(11);
		document.getElementById("oct").checked = intArr.includes(12);
	}
};

function onNew() {
	var intervals = [];
	if (document.getElementById("min2").checked) intervals = intervals.concat(1);
	if (document.getElementById("maj2").checked) intervals = intervals.concat(2);
	if (document.getElementById("min3").checked) intervals = intervals.concat(3);
	if (document.getElementById("maj3").checked) intervals = intervals.concat(4);
	if (document.getElementById("per4").checked) intervals = intervals.concat(5);
	if (document.getElementById("tri").checked) intervals = intervals.concat(6);
	if (document.getElementById("per5").checked) intervals = intervals.concat(7);
	if (document.getElementById("min6").checked) intervals = intervals.concat(8);
	if (document.getElementById("maj6").checked) intervals = intervals.concat(9);
	if (document.getElementById("min7").checked) intervals = intervals.concat(10);
	if (document.getElementById("maj7").checked) intervals = intervals.concat(11);
	if (document.getElementById("oct").checked) intervals = intervals.concat(12);
	window.localStorage.setItem("intervals", intervals.join());
	if (intervals.length == 0) {
		document.querySelector('#instructions').innerHTML  = "First select at least one interval";
	} else {
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
			Musicality_PickRandomIntervalToRecognise(intervals);
		}
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

