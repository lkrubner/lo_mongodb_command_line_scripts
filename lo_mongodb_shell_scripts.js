

function empty_the_collections() {
    db.Apps.remove({});
    db.Assignments.remove({});
    db.Attendance.remove({});
    db.Awards.remove({});
    db.AwardsAssigned.remove({});
    db.Course.remove({});
    db.CourseActivity.remove({});
    db.CourseActivityGrade.remove({});
    db.Demographics.remove({});
    db.GradeHistory.remove({});
    db.Grades.remove({});
    db.Reminders.remove({});
    db.Role.remove({});
    db.SchoolYear.remove({});
    db.SchoolYears.remove({});
    db.Searches.remove({});
    db.StudentSchedules.remove({});
    db.User.remove({});
    db.UserApps.remove({});
    db.UserAwards.remove({});
    db.UserDisciplinaryIncidents.remove({});
    db.UserProvider.remove({});
    db.UserRole.remove({});
}


function show_counts_of_the_collections() {
    print('Apps');
    print(db.Apps.find().count());
    print('Assignments');
    print(db.Assignments.find().count());
    print('Attendance');
    print(db.Attendance.find().count());
    print('Awards');
    print(db.Awards.find().count());
    print('AwardsAssigned');
    print(db.AwardsAssigned.find().count());
    print('Course');
    print(db.Course.find().count());
    print('CourseActivity');
    print(db.CourseActivity.find().count());
    print('CourseActivityGrade');
    print(db.CourseActivityGrade.find().count());
    print('Demographics');
    print(db.Demographics.find().count());
    print('GradeHistory');
    print(db.GradeHistory.find().count());
    print('Grades');
    print(db.Grades.find().count());
    print('Reminders');
    print(db.Reminders.find().count());
    print('Role');
    print(db.Role.find().count());
    print('SchoolYear');
    print(db.SchoolYear.find().count());
    print('SchoolYears');
    print(db.SchoolYears.find().count());
    print('Searches');
    print(db.Searches.find().count());
    print('StudentSchedules');
    print(db.StudentSchedules.find().count());
    print('User');
    print(db.User.find().count());
    print('UserApps');
    print(db.UserApps.find().count());
    print('UserAwards');
    print(db.UserAwards.find().count());
    print('UserDisciplinaryIncidents');
    print(db.UserDisciplinaryIncidents.find().count());
    print('UserProvider');
    print(db.UserProvider.find().count());
    print('UserRole');
    print(db.UserRole.find().count());
}

