var Musicality_IntervalName = ["note", "semitone", "whole tone", "minor 3rd", "major 3rd", "perfect 4th", "tritone", "perfect 5th", "minor 6th", "major 6th", "minor 7th", "major 7th", "octave"];
var Musicality_ShortIntervalName = ["Unison", "Min 2nd", "Maj 2nd", "Min 3rd", "Maj 3rd", "Perf 4th", "TriTone", "Perf 5th", "Min 6th", "Maj 6th", "Min 7th", "Maj 7th", "Octave"];
var Musicality_ScaleDegrees = [0, 1, 1, 2, 2, 3, 3, 4, 5, 5, 6, 6, 7];
var Musicality_NoteLetterNotes = [0, 0, 2, 4, 4, 5, 5, 7, 7, 9, 11, 11]; // C C D E E F F G G A B B
var Musicality_MajorSequenceNotes = [0, 2, 4, 5, 7, 9, 11, 12]; // C D E F G A B C
var Musicality_NatMinorSequenceNotes = [0, 2, 3, 5, 7, 8, 10, 12]; // C D E♭ F G A♭ B♭ C
var Musicality_HarmMinorSequenceNotes = [0, 2, 3, 5, 7, 8, 11, 12]; // C D E♭ F G A♭ B C
var Musicality_MelMinorSequenceNotes = [0, 2, 3, 5, 7, 9, 11, 12]; // C D E♭ F G A B C
var Musicality_TriadIntervalsAbove = [
		{notes: [-0, -3, -7], type:"maj"},
		{notes: [-0, -4, -7], type:"min"},
		{notes: [-8, -0, -3], type:"min"},
		{notes: [-9, -0, -4], type:"maj"},
		{notes: [-5, -8, -0], type:"maj"},
		{notes: [-5, -9, -0], type:"min"}
];
var Musicality_TriadIntervalsBelow = [
		{notes: [7, 3, 0], type:"min", description:"Minor, root position"},
		{notes: [7, 4, 0], type:"maj", description:"Major, root position"},
		{notes: [3, 0, 8], type:"maj", description:"Major, first inversion"},
		{notes: [4, 0, 9], type:"min", description:"Minor, first inversion"},
		{notes: [0, 8, 5], type:"min", description:"Minor, second inversion"},
		{notes: [0, 9, 5], type:"maj", description:"Major, second inversion"}
];
var Musicality_NoteNames = [
		{ Name1:"C", Degree1:0, Name2:"C", Degree2:0, Sharps:0 },
		{ Name1:"C♯", Degree1:0, Name2:"D♭", Degree2:1, Sharps:2 },
		{ Name1:"D", Degree1:1, Name2:"D", Degree2:1, Sharps:0 },
		{ Name1:"D♯", Degree1:1, Name2:"E♭", Degree2:2, Sharps:4 },
		{ Name1:"E", Degree1:2, Name2:"E", Degree2:2, Sharps:0 },
		{ Name1:"F", Degree1:3, Name2:"F", Degree2:3, Sharps:0 },
		{ Name1:"F♯", Degree1:3, Name2:"G♭", Degree2:4, Sharps:1 },
		{ Name1:"G", Degree1:4, Name2:"G", Degree2:4, Sharps:0 },
		{ Name1:"G♯", Degree1:4, Name2:"A♭", Degree2:5, Sharps:3 },
		{ Name1:"A", Degree1:5, Name2:"A", Degree2:5, Sharps:0 },
		{ Name1:"A♯", Degree1:5, Name2:"B♭", Degree2:6, Sharps:5 },
		{ Name1:"B", Degree1:6, Name2:"B", Degree2:6, Sharps:0 },
];

var Musicality_RangeNote = 0;
var Musicality_RangeOctave = 3;
var Musicality_NotePlayDelay = 0.75;
var Musicality_NotePlayDelayDefault = 0.75;

var Musicality_SingChoiceNote = 0;
var Musicality_SingChoiceChordTop = 1;
var Musicality_SingChoiceChordBottom = 2;
var Musicality_SingChoiceChordAbove = 3;
var Musicality_SingChoiceChordBelow = 4;

var Musicality_StartNotes = null;
var Musicality_AnswerNotes = null;
var Musicality_AnswerText = null;

function Musicality_Initialise() {
	MIDI.loadPlugin({
		soundfontUrl: "./soundfont/",
		instrument: "acoustic_grand_piano"
	});
}

function Musicality_PickRandomIntervalToRecognise() {
	Musicality_NotePlayDelay = Musicality_NotePlayDelayDefault;
	var interval = Math.floor(Math.random() * 12) + 1; // 1 .. 12
	var startNote = Math.floor(Math.random() * (interval/2+12)) + 54 - Math.floor(interval/2);
	var targetNote = startNote + interval;
	Musicality_StartNotes = [[startNote, targetNote]];
	Musicality_AnswerNotes = [startNote, targetNote];
	Musicality_PlayNotes(Musicality_StartNotes);
	Musicality_AnswerText = 
		Musicality_ShortIntervalName[targetNote-startNote]  + ": " + 
		Musicality_NotePairText(startNote, targetNote, false);
}

function Musicality_PickRandomChordToRecognise() {
	Musicality_NotePlayDelay = Musicality_NotePlayDelayDefault;
	var startNote = Math.floor(Math.random() * 12) + 54;
	var triad = Musicality_TriadIntervalsBelow[Math.floor(Math.random() * Musicality_TriadIntervalsBelow.length)];
	var intervalToRoot = triad.notes[triad.notes.length-1];
	var chordRootNote = (startNote + 12 + intervalToRoot) % 12;
	var chordName = MakeChordName(chordRootNote, "");
	var chordNotes = triad.notes.slice();
	chordNotes.sort((a,b) => a-b);
	Musicality_AnswerNotes = chordNotes.map(i=>startNote+i);
	Musicality_StartNotes = [Musicality_AnswerNotes];
	Musicality_PlayNotes(Musicality_StartNotes);
	Musicality_AnswerText = "[" + chordName + "] " + triad.description;
}

function Musicality_ReplayStartNotes() {
	Musicality_PlayNotes(Musicality_StartNotes);
}

function Musicality_PlayAnswerNotes() {
	Musicality_PlayNotes(Musicality_AnswerNotes);
	return Musicality_AnswerText;
}

function Musicality_PlaySelectedSingRange() {
	Musicality_NotePlayDelay = Musicality_NotePlayDelayDefault;
	var n = Musicality_RangeOctave*12+12+Musicality_RangeNote;
	Musicality_PlayNotes([n, n+4, n+7, n+12]);
}

function Musicality_PickIntervalToSing(singChoice, intervals) {
	Musicality_NotePlayDelay = Musicality_NotePlayDelayDefault;
	var targetNote = Musicality_RangeOctave*12+12+Musicality_RangeNote+Math.floor(Math.random() * 12);
	Musicality_AnswerNotes = [targetNote];
	if (singChoice == Musicality_SingChoiceNote) {
		var interval = intervals[Math.floor(Math.random() * intervals.length)]
		if (Math.random() > 0.5) interval = -interval;
		var startNote = targetNote - interval;
		Musicality_StartNotes = [startNote];
		Musicality_PlayNotes(Musicality_StartNotes);
		Musicality_AnswerText = Musicality_NotePairText(startNote, targetNote, false);
		return "Sing a " + Musicality_IntervalName[Math.abs(interval)] + (interval > 0 ? " above ..." : " below ...");
	} else {
		var isAbove = singChoice == Musicality_SingChoiceChordTop || singChoice == Musicality_SingChoiceChordAbove;
		var interval = (singChoice == Musicality_SingChoiceChordTop || singChoice == Musicality_SingChoiceChordBottom) ? 0 : 
							intervals[Math.floor(Math.random() * intervals.length)];
		var startNote = isAbove ? targetNote - interval : targetNote + interval;
        var triad = isAbove ? Musicality_TriadIntervalsAbove[Math.floor(Math.random() * Musicality_TriadIntervalsAbove.length)] :
							  Musicality_TriadIntervalsBelow[Math.floor(Math.random() * Musicality_TriadIntervalsBelow.length)];
		Musicality_StartNotes = [triad.notes.map(i=>startNote+i)]
		var intervalToRoot = triad.notes[triad.notes.length-1];
		var scaleDegreesToroot = intervalToRoot < 0 ? -Musicality_ScaleDegrees[-intervalToRoot] : Musicality_ScaleDegrees[intervalToRoot];
		var chordRootNote = (startNote + 12 + intervalToRoot) % 12;
		var chordName = MakeChordName(chordRootNote, triad.type);
		Musicality_PlayNotes(Musicality_StartNotes);
		if (interval == 0) {
			var targetNoteName = Musicality_NoteNameInTonality(targetNote, chordRootNote, -scaleDegreesToroot);
			Musicality_AnswerText = "(" + chordName + ") : " + targetNoteName;
			return isAbove ? "Sing the top note of ..." : "Sing the bottom note of ...";
		} else {
			var startNoteName = Musicality_NoteNameInTonality(startNote, chordRootNote, -scaleDegreesToroot);
			var targetNoteName = Musicality_NoteNameInTonality(targetNote, chordRootNote, Musicality_ScaleDegrees[isAbove ? interval : 12 - interval]-scaleDegreesToroot);
			Musicality_AnswerText = "(" + chordName + ") : " + startNoteName + " - " + targetNoteName;
			var intervalName = Musicality_IntervalName[Math.abs(interval)]
			return isAbove ? "Sing a " + intervalName + " above the top note of ..." : 
							 "Sing a " + intervalName + " below the bottom note of ...";
		}
	}
}

function Musicality_PlaySequenceToTranscribe(length, key, mode, speed) {
	Musicality_NotePlayDelay = Musicality_NotePlayDelayDefault;
	switch (speed) {
		case "Fast":
			Musicality_NotePlayDelay = 0.75;
			break;
		case "Medium":
			Musicality_NotePlayDelay = 1;
			break;
		case "Slow":
			Musicality_NotePlayDelay = 1.5;
			break;
	}
	var lowNote = 48 + key;
	var displayNotesUsingFlats = (mode == "Major" ? [3, 5, 8, 10] : [0, 2, 3, 5, 7, 8, 10]).includes(key);
	var keyNoteName = displayNotesUsingFlats ? Musicality_NoteNames[key % 12].Name2 : Musicality_NoteNames[key % 12].Name1;
	var notes = Musicality_MakeNoteSequence(lowNote, mode, length)
	Musicality_StartNotes = [[lowNote, lowNote+12], []].concat(notes);
	Musicality_PlayNotes(Musicality_StartNotes);
	Musicality_AnswerNotes = [];
	if (displayNotesUsingFlats) {
		Musicality_AnswerText = notes.map(n=>Musicality_NoteNames[n % 12].Name2 + (n >= 60 ? "'" : "")).join(" ");
	} else {
		Musicality_AnswerText = notes.map(n=>Musicality_NoteNames[n % 12].Name1 + (n >= 60 ? "'" : "")).join(" ");
	}
	return "Write down this sequence (after an initial " + keyNoteName + ")"
}

function Musicality_ShowSequenceToSing(length, key, mode) {
	Musicality_NotePlayDelay = Musicality_NotePlayDelayDefault;
	var lowNote = 48 + key;
	var displayNotesUsingFlats = (mode == "Major" ? [3, 5, 8, 10] : [0, 2, 3, 5, 7, 8, 10]).includes(key);
	var keyNoteName = displayNotesUsingFlats ? Musicality_NoteNames[key % 12].Name2 : Musicality_NoteNames[key % 12].Name1;
	var notes = Musicality_MakeNoteSequence(lowNote, mode, length)
	Musicality_StartNotes = [lowNote];
	Musicality_PlayNotes(Musicality_StartNotes);
	Musicality_AnswerNotes = notes;
	var noteDisplay = displayNotesUsingFlats ?
		notes.map(n=>Musicality_NoteNames[n % 12].Name2 + (n >= 60 ? "'" : "")).join(" ") :
		notes.map(n=>Musicality_NoteNames[n % 12].Name1 + (n >= 60 ? "'" : "")).join(" ");
	Musicality_AnswerText = "";
	return "Here is a " + keyNoteName + ". Sing this sequence: " + noteDisplay;
}

function Musicality_MakeNoteSequence(lowNote, mode, length) {
	var notes = [];
	var lastNote = 0;
	var sequenceNotesUp = null;
	var sequenceNotesDown = null;
	switch (mode) {
		case "Major":
			sequenceNotesUp = Musicality_MajorSequenceNotes.map(n=> n+lowNote);
			sequenceNotesDown = sequenceNotesUp;
			break;
		case "Natural Minor":
			sequenceNotesUp = Musicality_NatMinorSequenceNotes.map(n=> n+lowNote);
			sequenceNotesDown = sequenceNotesUp;
			break;
		case "Harmonic Minor":
			sequenceNotesUp = Musicality_HarmMinorSequenceNotes.map(n=> n+lowNote);
			sequenceNotesDown = sequenceNotesUp;
			break;
		case "Melodic Minor":
			sequenceNotesUp = Musicality_MelMinorSequenceNotes.map(n=> n+lowNote);
			sequenceNotesDown = Musicality_NatMinorSequenceNotes.map(n=> n+lowNote);
			break;
	}
	var lastInSequence = Math.floor(Math.random() * sequenceNotesUp.length);
	var goingUp = lastInSequence < sequenceNotesUp.length / 2;

	while (notes.length < length) {
		var nextNoteInSequence = 0;
		var nextNote = 0;
		if (Math.random() < 0.25) goingUp = !goingUp;
		switch (Math.floor(Math.random() * 10)) {
			case 0:
			case 1:
			case 2:
			case 3:
				nextNoteInSequence = goingUp ? lastInSequence + 1 : lastInSequence - 1;
				break;
			case 4:
			case 5:
			case 6:
				nextNoteInSequence = goingUp ? lastInSequence + 2 : lastInSequence - 2;
				break;
			case 7:
			case 8:
				nextNoteInSequence = goingUp ? lastInSequence + 3 : lastInSequence - 3;
				break;
			default:
				nextNoteInSequence = Math.floor(Math.random() * sequenceNotesUp.length);
				break;
		}
		
		if (nextNoteInSequence < 0 || nextNoteInSequence >= sequenceNotesUp.length) {
			nextNoteInSequence = Math.floor(Math.random() * sequenceNotesUp.length);
		}

		goingUp = nextNoteInSequence > lastInSequence;
		lastInSequence = nextNoteInSequence;
		nextNote = goingUp ? sequenceNotesUp[nextNoteInSequence] : sequenceNotesDown[nextNoteInSequence];

		if (nextNote != lastNote) {
			notes.push(nextNote);
			lastNote = nextNote;
		}
	}
	
	return notes;	
}

function MakeChordName(chordRootNote, chordType) {
	var chordRootName = Musicality_NoteNames[chordRootNote];
	var chordName = chordRootName.Sharps <= 3 ? chordRootName.Name1 : chordRootName.Name2;
	return chordName + chordType;
}

function Musicality_PlayNote(note, delay) {
	var velocity = 100; // how hard the note hits
	MIDI.noteOn(0, note, velocity, delay);
	MIDI.noteOff(0, note, delay+Musicality_NotePlayDelay);
}

function Musicality_PlayChord(notes, delay) {
	for (var i = 0; i < notes.length; i++) {
		Musicality_PlayNote(notes[i], delay);
	}
}

function Musicality_PlayNotes(notes) {
	for (var i = 0; i < notes.length; i++) {
		var n = notes[i];
		if (Array.isArray(n)) {
			Musicality_PlayChord(n, i*Musicality_NotePlayDelay)
		} else {
			Musicality_PlayNote(n, i*Musicality_NotePlayDelay)
		}
	}
}

function Musicality_NotePairText(startNote, targetNote, targetOnly) {
	var nnStart = Musicality_NoteNames[startNote % 12];
	var nnTarget = Musicality_NoteNames[targetNote % 12];
	var interval = targetNote - startNote;
	var nameStart = null;
	var nameTarget = null;
	if (nnStart.Degree1 == nnStart.Degree2)	{
		nameStart = nnStart.Name1;
		nameTarget = nnTarget.Name1;
		if (nnTarget.Degree1 != nnTarget.Degree2) {
			if (interval == 6 ? 
				  nnTarget.Sharps >= 3 :
				interval < 0 ?
				  Musicality_ScaleDegrees[Math.abs(interval)] == (nnStart.Degree1 + 7 - nnTarget.Degree2) % 7 :
				  Musicality_ScaleDegrees[Math.abs(interval)] == (nnTarget.Degree2 + 7 - nnStart.Degree1) % 7) {
				nameTarget = nnTarget.Name2;
			}
		}
	}
	else if (nnTarget.Degree1 == nnTarget.Degree2) {
		nameStart = nnStart.Name1;
		nameTarget = nnTarget.Name1;
		if (interval == 6 ?
			  nnStart.Sharps >= 3 :
		   interval < 0 ?
			 Musicality_ScaleDegrees[Math.abs(interval)] == (nnStart.Degree2 + 7 - nnTarget.Degree1) % 7 :
			 Musicality_ScaleDegrees[Math.abs(interval)] == (nnTarget.Degree1 + 7 - nnStart.Degree2) % 7) {
			nameStart = nnStart.Name2;
		}
	}
	else
	{
		if (nnStart.Sharps + nnTarget.Sharps > 5) {
			nameStart = nnStart.Name2;
			nameTarget = nnTarget.Name2;
		}
		else
		{
			nameStart = nnStart.Name1;
			nameTarget = nnTarget.Name1;
		}
	}
	return targetOnly ? nameTarget : nameStart + " - " + nameTarget;
}

function Musicality_NoteNameInTonality(note, chordRootNote, scaleDegreesFromRoot)
{
	note = note %12;
	var chordNoteLetterNote = Musicality_NoteLetterNotes[chordRootNote];
	var tonalityScaleDegree = (Musicality_ScaleDegrees[chordNoteLetterNote] + scaleDegreesFromRoot + 7) % 7;
	var noteLetter = Musicality_MajorSequenceNotes[tonalityScaleDegree];
	var noteLetterText = Musicality_NoteNames[noteLetter].Name1.slice(0,1);
	switch ((note-noteLetter+12) %12)
	{
		case 0:
			return noteLetterText;
		case 1:
			return noteLetterText + "♯";
		case 2:
			return noteLetterText + "♯♯";
		case 11:
			return noteLetterText + "♭";
		case 10:
			return noteLetterText + "♭♭";
		default:
			return (note-noteLetter) > 0 ?
				noteLetterText + "+" + (note-noteLetter).toString() :
				noteLetterText + "-" + (noteLetter-note).toString();
	}
}
