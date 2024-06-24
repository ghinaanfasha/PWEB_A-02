document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('dropdownButton').addEventListener('click', function(event) {
        let dropdownMenu = document.getElementById('dropdownMenu');
        dropdownMenu.classList.toggle('hidden');
    });

    document.getElementById('task-file').addEventListener('change', function(e) {
        var fileName = e.target.files[0].name;
        document.querySelector('label[for="task-file"]').textContent = fileName;
    });

    document.getElementById('taskForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        let form = event.target;
        let formData = new FormData(form);

        try {
            let response = await fetch(form.action, {
                method: form.method,
                body: formData
            });

            if (response.ok) {
                let newTask = await response.json();
                addAssignmentToList(newTask);
                form.reset();
                document.getElementById('dropdownMenu').classList.add('hidden');
            } else {
                console.error('Failed to upload assignment');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    function addAssignmentToList(assignment) {
        let assignmentsList = document.getElementById('assignmentsList');
        let assignmentDiv = document.createElement('div');
        assignmentDiv.classList.add('h-24', 'm-6', 'border-4', 'rounded-xl', 'flex-col');

        function formatDate(dateString) {
            let date = new Date(dateString);
            let day = String(date.getDate()).padStart(2, '0');
            let month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
            let year = date.getFullYear();
            let hours = String(date.getHours()).padStart(2, '0');
            let minutes = String(date.getMinutes()).padStart(2, '0');
            return `${day}/${month}/${year} - ${hours}:${minutes}`;
        }

        assignmentDiv.innerHTML = `
              <div class="flex h-8 mx-4 border-b-4 items-center justify-between">
                <p>Tugas ${assignment.id_tugas} | ${formatDate(assignment.deadline)}</p>
                <div class="text-center">
                  <button class="hover:text-blue-600" onclick="viewAssignment('<%= assignment.id_tugas %>')">View</button>
                  <button class="hover:text-blue-600 pl-6" onclick="editAssignment('<%= assignment.id_tugas %>')">Edit</button>
                </div>
              </div>
              <div class="flex h-16 pl-8 pt-2">
                <h3 class="text-2xl">${assignment.judul_tugas}</h3>
              </div>           
        `;

        assignmentsList.appendChild(assignmentDiv);
    }
});
async function viewAssignment(id) {
    try {
      const response = await fetch(`/adminMagangAssignments/${id}`);
      const assignment = await response.json();
      document.getElementById('viewTitle').textContent = assignment.judul_tugas;
      document.getElementById('viewDescription').textContent = assignment.keterangan;
      document.getElementById('viewDeadline').textContent = new Date(assignment.deadline).toLocaleString('id-ID');
      document.getElementById('viewFile').innerHTML = assignment.file_tugas ? `<a href="${assignment.file_tugas}" target="_blank">Download File</a>` : 'No file uploaded';
      document.getElementById('viewModal').classList.remove('hidden');
    } catch (error) {
      console.error('Error fetching assignment:', error);
    }
  }

  function closeViewModal() {
    document.getElementById('viewModal').classList.add('hidden');
  }

  async function editAssignment(id) {
    try {
      const response = await fetch(`/adminMagangAssignments/${id}`);
      const assignment = await response.json();
      document.getElementById('editId').value = assignment.id_tugas;
      document.getElementById('editTitle').value = assignment.judul_tugas;
      document.getElementById('editDescription').value = assignment.keterangan;
      document.getElementById('editDeadline').value = new Date(assignment.deadline).toISOString().slice(0, 16);
      document.getElementById('editModal').classList.remove('hidden');
    } catch (error) {
      console.error('Error fetching assignment:', error);
    }
  }

  function closeEditModal() {
    document.getElementById('editModal').classList.add('hidden');
  }

  async function submitEditForm(event) {
    event.preventDefault();
    const id = document.getElementById('editId').value;
    const judul_tugas = document.getElementById('editTitle').value;
    const keterangan = document.getElementById('editDescription').value;
    const deadline = document.getElementById('editDeadline').value;

    try {
      const response = await fetch(`/adminMagangAssignments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ judul_tugas, keterangan, deadline })
      });

      if (response.ok) {
        closeEditModal();
        location.reload();
      } else {
        console.error('Failed to update assignment');
      }
    } catch (error) {
      console.error('Error updating assignment:', error);
    }
  }