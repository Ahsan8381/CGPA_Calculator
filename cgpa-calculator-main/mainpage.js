const semesterSubjects = [{
    name: "Semester 1",
    subjects: [{
        name: "DSA using C++",
        credits: 4
    }, {
        name: "Database Management System",
        credits: 4
    }, {
        name: "Digital logic and Computer Architecture",
        credits: 4
    }, {
        name: "Laboratory Course(C++)",
        credits: 4
    }, {
        name: "Analysis and Design of information System",
        credits: 4
    }, {
        name: "Soft Skills",
        credits: 4
    }]
}, {
    name: "Semester 2",
    subjects: [{
        name: "OOPs using Java",
        credits: 4
    }, {
        name: "Data Communication & Computer Network",
        credits: 4
    }, {
        name: "Laboratory Course-2(Java)",
        credits: 4
    }, {
        name: "Statistics",
        credits: 4
    }, {
        name: "E-Commerce",
        credits: 4
    }, {
        name: "Web Development",
        credits: 4
    }]
}, {
    name: "Semester 3",
    subjects: [{
        name: "Operating System",
        credits: 4
    }, {
        name: "Software Engineering",
        credits: 4
    }, {
        name: "Theory of Computation",
        credits: 4
    }, {
        name: "Data Science using Python",
        credits: 4
    }, {
        name: "Laboratory Course-3",
        credits: 4
    }, {
        name: "Artificial Intelligance",
        credits: 4
    }, {
        name: "Network Programming",
        credits: 4
    }]
}, {
    name: "Semester 4",
    subjects: [{
        name: "Dissertation/Project",
        credits: 20
    }]
}];

let currentSemesterIndex = 0;

// The loadSemesters function should only run once at the start to load the first semester
function loadInitialSemester() {
    const semestersContainer = document.getElementById('semesters');
    // Call a separate function to create and append the semester
    appendSemester(semesterSubjects[currentSemesterIndex]);
}

function appendSemester(semester) {
    const semestersContainer = document.getElementById('semesters');
    const semesterContainer = document.createElement('div');
    semesterContainer.className = 'semester-container';

    const semesterTitle = document.createElement('h3');
    semesterTitle.textContent = semester.name;
    semesterContainer.appendChild(semesterTitle);

    const table = document.createElement('table');
    table.className = 'subject-list';

    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
        <th>Subject</th>
        <th>Grade</th>
        <th>Credit Hours</th>
    `;
    table.appendChild(headerRow);

    semester.subjects.forEach(subject => {
        const row = document.createElement('tr');
        const subjectCell = document.createElement('td');
        subjectCell.textContent = subject.name;

        const gradeCell = document.createElement('td');
        const gradeSelect = document.createElement('select');
        ['O', 'A+', 'A', 'B+', 'B', 'C', 'P'].forEach(grade => {
            const option = document.createElement('option');
            option.value = grade;
            option.textContent = grade;
            gradeSelect.appendChild(option);
        });
        gradeSelect.onchange = calculateCGPA;
        gradeCell.appendChild(gradeSelect);

        const creditsCell = document.createElement('td');
        creditsCell.textContent = subject.credits;

        row.appendChild(subjectCell);
        row.appendChild(gradeCell);
        row.appendChild(creditsCell);

        table.appendChild(row);
    });

    semesterContainer.appendChild(table);
    semestersContainer.appendChild(semesterContainer);
}

function addSemester() {
    if (currentSemesterIndex < semesterSubjects.length - 1) {
        currentSemesterIndex++;
        // Append only the next semester
        appendSemester(semesterSubjects[currentSemesterIndex]);
        // Recalculate CGPA after a new semester is added
        calculateCGPA();
    }
}

function calculateCGPA() {
    // This function remains the same as it correctly reads from the DOM
    let totalCredits = 0;
    let totalGradePoints = 0;
    const semesters = document.querySelectorAll('.semester-container');
    semesters.forEach((semester) => {
        let semesterCredits = 0;
        let semesterGradePoints = 0;
        const rows = semester.querySelectorAll('.subject-list tr');
        rows.forEach((row, rowIndex) => {
            if (rowIndex === 0) return;
            const grade = row.cells[1].querySelector('select').value;
            const credits = parseInt(row.cells[2].textContent);
            semesterCredits += credits;
            semesterGradePoints += getGradePoint(grade) * credits;
        });

        // GPA for this semester
        const semesterGPA = semesterGradePoints / semesterCredits;
        if (document.getElementById('overall-gpa-display')) {
            document.getElementById('overall-gpa-display').textContent = `GPA for Current Semester: ${semesterGPA.toFixed(3)}`;
        }

        totalCredits += semesterCredits;
        totalGradePoints += semesterGradePoints;
    });

    const overallCGPA = totalGradePoints / totalCredits;
    if (document.getElementById('overall-cgpa-display')) {
        document.getElementById('overall-cgpa-display').textContent = `Overall CGPA: ${overallCGPA.toFixed(3)}`;
    }
}

function getGradePoint(grade) {
    switch (grade) {
        case 'O':
            return 10;
        case 'A+':
            return 9;
        case 'A':
            return 8;
        case 'B+':
            return 7;
        case 'B':
            return 6;
        case 'C':
            return 5;
        case 'P':
            return 4;
        default:
            return 0;
    }
}

// Initial call to load the first semester
document.addEventListener('DOMContentLoaded', loadInitialSemester);