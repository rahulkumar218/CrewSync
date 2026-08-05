import pandas as pd

employees = {
    "Employee": ["Rahul", "Binita", "Aman", "Priya"],
    "Department": ["IT", "HR", "Finance", "IT"],
    "Salary": [60000, 50000, 70000, 65000],
    "Attendance": [96, 91, 98, 93]
}

df = pd.DataFrame(employees)

print("=== Employee Data ===")
print(df)

print("\nAverage Salary:", df["Salary"].mean())
print("Highest Salary:", df["Salary"].max())
print("Average Attendance:", df["Attendance"].mean())


