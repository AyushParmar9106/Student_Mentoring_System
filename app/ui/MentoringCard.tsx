export default function MentoringCard({ session }: { session: any }) {
  // Use optional chaining (?.) at every level to safely access nested data
  const studentName = session?.studentmentor?.students?.StudentName || "Unknown Student";
  const mentorName = session?.studentmentor?.staff?.StaffName || "Unassigned Mentor";

  return (
    <div className='card shadow-lg border-0 bg-body rounded-4 overflow-hidden mb-3 border border-secondary-subtle'>
      <div className={`card-header d-flex justify-content-between py-3 ${
        session?.AttendanceStatus === 'Present' ? 'bg-success-subtle' : 'bg-danger-subtle'
      }`}>
        <span className='fw-bold small text-body'>ID: #{session?.StudentMentoringID}</span>
        <span className='badge bg-primary'>Stress: {session?.StressLevel || 'N/A'}</span>
      </div>
      <div className='card-body'>
        <p className='mb-1 text-body'><strong>Mentor:</strong> {mentorName}</p>
        <p className='mb-1 text-body'><strong>Student:</strong> {studentName}</p>
        <div className='p-2 bg-body-tertiary rounded small italic mt-2'>
          "{session?.IssuesDiscussed || "No issues recorded."}"
        </div>
      </div>
    </div>
  );
}