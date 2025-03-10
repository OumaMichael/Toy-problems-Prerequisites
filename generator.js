function generate(Studentscore) {
  if (Studentscore>79) {
    return "A";
} else if (Studentscore>=60 && Studentscore<=79) {
    return "B";
  } else if (Studentscore>=49 && Studentscore<=59) {
    return "C";
  } else if (Studentscore>=40 && Studentscore<=49) {
    return "D";
  } else {
    return "E";
  }
};
Studentscore = [80, 70, 60, 50, 40, 30];
console.log(Studentscore.map(generate)); 