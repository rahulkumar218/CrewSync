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


import pandas as pd

# Load dataset
df = pd.read_csv("../data/employee_data.csv")

print("========== Employee Dataset ==========")
print(df)

print("\n========== Basic Analytics ==========")

print(f"Total Employees : {len(df)}")
print(f"Average Salary : ₹{df['Salary'].mean():,.2f}")
print(f"Highest Salary : ₹{df['Salary'].max():,.2f}")
print(f"Lowest Salary  : ₹{df['Salary'].min():,.2f}")
print(f"Average Attendance : {df['Attendance'].mean():.2f}%")

print("\nDepartment Wise Employee Count")
print(df["Department"].value_counts())

print("\nAverage Performance Rating")
print(df["PerformanceRating"].mean())