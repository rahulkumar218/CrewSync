const getEmployees = (req, res) => {

    const employees = [

        {
            id: 1,
            name: "Rahul",
            department: "IT",
            salary: 60000
        },

        {
            id: 2,
            name: "Binita",
            department: "HR",
            salary: 50000
        },

        {
            id: 3,
            name: "Aman",
            department: "Finance",
            salary: 70000
        }

    ];

    res.json(employees);

};

module.exports = {
    getEmployees
};