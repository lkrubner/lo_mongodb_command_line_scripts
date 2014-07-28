

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

// 2014-07-22 - taken from here
// http://stackoverflow.com/questions/264430/how-can-i-get-a-list-of-the-differences-between-two-javascript-object-graphs
function findDifferences(objectA, objectB) {
    var propertyChanges = [];
    var objectGraphPath = ["this"];
    (function(a, b) {
	if(a.constructor == Array) {
            // BIG assumptions here: That both arrays are same length, that
            // the members of those arrays are _essentially_ the same, and 
            // that those array members are in the same order...
            for(var i = 0; i < a.length; i++) {
		objectGraphPath.push("[" + i.toString() + "]");
		arguments.callee(a[i], b[i]);
		objectGraphPath.pop();
            }
	} else if(a.constructor == Object || (a.constructor != Number && 
					      a.constructor != String && a.constructor != Date && 
					      a.constructor != RegExp && a.constructor != Function &&
					      a.constructor != Boolean)) {
            // we can safely assume that the objects have the 
            // same property lists, else why compare them?
            for(var property in a) {
		objectGraphPath.push(("." + property));
		if(a[property].constructor != Function) {
		    arguments.callee(a[property], b[property]);
		}
		objectGraphPath.pop();
            }
	} else if(a.constructor != Function) { // filter out functions
            if(a != b) {
		propertyChanges.push({ "Property": objectGraphPath.join(""), "ObjectA": a, "ObjectB": b });
            }
	}
    })(objectA, objectB);
    return propertyChanges;
}

function find_items_in_second_array_that_are_not_in_first_array (a1, a2) {
    var diff=[];

    for (var i=0; i< a2.length; i++) {
	var next_item = a2[i];
	var does_this_item_exist_in_the_first_array = a1.indexOf(next_item); 
	print(" for " + next_item + " we got the matching result: " + does_this_item_exist_in_the_first_array); 
	if (does_this_item_exist_in_the_first_array == -1) {
	    diff.push(a2[i]);
	}
    }
    return diff;
}

function find_differences_in_this_collections_documents (collection_name) {
    // 2014-07-22 - we use this function mostly to see the difference between a
    // "User" imported from OpenSIS and a "User" imported from Moodle.
    // I am being lazy right now, so I will only compare top level keys. 
    // Later I will make this function an in-depth search.
    // Added skip(2) to avoid the 2 irregular documents that the importer inserts.
    var cursor = db[collection_name].find().skip(2);
    // start with any document
    var intitial_document = cursor[0];
    var array_of_initial_keys = []; 
    for (var key in intitial_document) { array_of_initial_keys.push(key); }
    // we don't want all (of the same) keys from 500 documents that are different from 
    //  the first document, so we will collect changes as we find them. 
    var array_of_keys_to_not_match = array_of_initial_keys.slice(0); 
    var array_of_different_keys = [];

    print("The number of items found in this collection: " + cursor.length());

    for (var i=1; i < cursor.length(); i++) {
	var next_document = cursor[i];
	var array_of_next_document_keys = [];
	for (var key in next_document) { array_of_next_document_keys.push(key); }
	var keys_that_are_different = find_items_in_second_array_that_are_not_in_first_array(array_of_keys_to_not_match, array_of_next_document_keys);
	for (var w=0; w < keys_that_are_different.length; w++) {
	    // we don't want all (of the same) keys from 500 documents that are different from 
	    //  the first document, so we will collect changes as we find them. 
	    array_of_keys_to_not_match.push(keys_that_are_different[w]);
	    array_of_different_keys.push(keys_that_are_different[w]); 
	}
    }

    print("These are the initial keys:");
    printjson(array_of_initial_keys);
    print("These other keys were found:");
    printjson(array_of_different_keys); 
}



