document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const dashboardSection = document.getElementById('dashboard-section');
    const logoutButton = document.getElementById('logout-button');
    const studentForm = document.getElementById('student-form');
    const classForm = document.getElementById('class-form');
    const classSelect = document.getElementById('class-select');
    const filterClassSelect = document.getElementById('filter-class-select');
    const attendanceList = document.getElementById('attendance-list');
    const attendanceChart = document.getElementById('attendance-chart').getContext('2d');
    const reportForm = document.getElementById('report-form');
    const studentSelect = document.getElementById('student-select');
    const reportOutput = document.getElementById('report-output');

    // Modal elements
    const editModal = document.getElementById('edit-modal');
    const closeModal = document.querySelector('.close');
    const editStudentForm = document.getElementById('edit-student-form');
    const editStudentNameInput = document.getElementById('edit-student-name');
    const notification = document.getElementById('notification');
    let currentEditIndex = null;

    // Função para autenticar o login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        // Autenticar usuário (exemplo simples)
        if (username === 'professor' && password === 'senha') {
            document.getElementById('login-section').style.display = 'none';
            dashboardSection.style.display = 'block';
            showNotification('Login bem-sucedido!');
            loadDashboard();
        } else {
            showNotification('Usuário ou senha inválidos', true);
        }
    });

    // Função para deslogar
    logoutButton.addEventListener('click', () => {
        dashboardSection.style.display = 'none';
        document.getElementById('login-section').style.display = 'block';
        showNotification('Logout bem-sucedido!');
    });

    // Função para cadastrar turma
    classForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const className = document.getElementById('class-name').value;
        let classes = JSON.parse(localStorage.getItem('classes')) || [];
        classes.push(className);
        localStorage.setItem('classes', JSON.stringify(classes));
        document.getElementById('class-name').value = '';
        loadDashboard();
        showNotification('Turma cadastrada com sucesso!');
    });

    // Função para cadastrar aluno
    studentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const studentName = document.getElementById('student-name').value;
        const className = document.getElementById('class-select').value;
        let students = JSON.parse(localStorage.getItem('students')) || [];
        students.push({ name: studentName, class: className, attendance: [] });
        localStorage.setItem('students', JSON.stringify(students));
        document.getElementById('student-name').value = '';
        loadDashboard();
        showNotification('Aluno cadastrado com sucesso!');
    });

    // Função para carregar o dashboard
    function loadDashboard() {
        let students = JSON.parse(localStorage.getItem('students')) || [];
        let classes = JSON.parse(localStorage.getItem('classes')) || [];
        attendanceList.innerHTML = '';
        studentSelect.innerHTML = '';
        classSelect.innerHTML = '';
        filterClassSelect.innerHTML = '<option value="all">Todas as Turmas</option>';

        // Preencher opções de turma no formulário de cadastro de alunos e no filtro
        classes.forEach((className) => {
            let optionItem = document.createElement('option');
            optionItem.value = className;
            optionItem.text = className;
            classSelect.appendChild(optionItem);
            filterClassSelect.appendChild(optionItem.cloneNode(true));
        });

        // Preencher lista de presenças e opções de alunos no relatório
        students.forEach((student, index) => {
            let listItem = document.createElement('div');
            listItem.setAttribute('data-class', student.class);
            listItem.innerHTML = `
                <span>${student.name} (${student.class})</span>
                <button onclick="markAttendance(${index})">Presente</button>
                <button onclick="markAbsence(${index})">Falta</button>
                <button onclick="openEditModal(${index})">Editar</button>`;
            attendanceList.appendChild(listItem);
            let optionItem = document.createElement('option');
            optionItem.value = index;
            optionItem.text = student.name;
            studentSelect.appendChild(optionItem);
        });
        updateChart();

        // Filtrar alunos por turma
        filterClassSelect.addEventListener('change', filterStudentsByClass);
    }

    // Função para marcar presença
    window.markAttendance = function (index) {
        let students = JSON.parse(localStorage.getItem('students')) || [];
        students[index].attendance.push({ date: new Date().toLocaleDateString(), status: 'present' });
        localStorage.setItem('students', JSON.stringify(students));
        loadDashboard();
        showNotification('Presença registrada com sucesso!');
    }

    // Função para marcar falta
    window.markAbsence = function (index) {
        let students = JSON.parse(localStorage.getItem('students')) || [];
        students[index].attendance.push({ date: new Date().toLocaleDateString(), status: 'absent' });
        localStorage.setItem('students', JSON.stringify(students));
        loadDashboard();
        showNotification('Falta registrada com sucesso!');
    }

    // Função para abrir o modal de edição
    window.openEditModal = function (index) {
        let students = JSON.parse(localStorage.getItem('students')) || [];
        editStudentNameInput.value = students[index].name;
        currentEditIndex = index;
        editModal.style.display = 'block';
    }

    // Função para fechar o modal de edição
    closeModal.addEventListener('click', () => {
        editModal.style.display = 'none';
    });

    // Função para salvar a edição do nome do aluno
    editStudentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let students = JSON.parse(localStorage.getItem('students')) || [];
        students[currentEditIndex].name = editStudentNameInput.value;
        localStorage.setItem('students', JSON.stringify(students));
        editModal.style.display = 'none';
        loadDashboard();
        showNotification('Nome do aluno editado com sucesso!');
    });

    // Função para atualizar o gráfico
    function updateChart() {
        let students = JSON.parse(localStorage.getItem('students')) || [];
        let totalStudents = students.length;
        let presentCount = students.filter(student => student.attendance.some(a => a.status === 'present')).length;
        let absentCount = totalStudents - presentCount;
        new Chart(attendanceChart, {
            type: 'pie',
            data: {
                labels: ['Presentes', 'Faltosos'],
                datasets: [{
                    data: [presentCount, absentCount],
                    backgroundColor: ['#36a2eb', '#ff6384']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    // Função para gerar relatório
    reportForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const studentIndex = document.getElementById('student-select').value;
        let students = JSON.parse(localStorage.getItem('students')) || [];
        let student = students[studentIndex];
        let reportHtml = `<h4>Relatório de Presenças de ${student.name}</h4><ul>`;
        student.attendance.forEach(entry => {
            reportHtml += `<li>${entry.date} - ${entry.status === 'present' ? 'Presente' : 'Falta'}</li>`;
        });
        reportHtml += `</ul>`;
        reportOutput.innerHTML = reportHtml;
    });

    // Função para filtrar alunos por turma
    function filterStudentsByClass() {
        const selectedClass = filterClassSelect.value;
        const studentItems = attendanceList.querySelectorAll('div[data-class]');
        studentItems.forEach(item => {
            if (selectedClass === 'all' || item.getAttribute('data-class') === selectedClass) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Função para mostrar notificação
    function showNotification(message, isError = false) {
        notification.textContent = message;
        if (isError) {
            notification.classList.add('error');
        } else {
            notification.classList.remove('error');
        }
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }

    // Carregar dashboard inicial
    loadDashboard();
});
