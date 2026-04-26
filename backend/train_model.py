import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib

# 1. LOAD DATASET (You can download 'student-mat.csv' or we generate synthetic data for now)
# For the sake of the script working immediately, I'll create a synthetic version 
# that mimics real student data patterns.
data = {
    'study_time': [1, 2, 3, 4, 1, 2, 3, 4, 2, 1] * 50,
    'absences': [10, 2, 0, 1, 15, 5, 0, 2, 8, 20] * 50,
    'quiz_score': [40, 85, 90, 95, 30, 60, 88, 92, 50, 20] * 50,
    'pass': [0, 1, 1, 1, 0, 1, 1, 1, 0, 0] * 50 # 1 = Pass, 0 = Fail (At Risk)
}

df = pd.DataFrame(data)

# 2. PREPROCESS
X = df[['study_time', 'absences', 'quiz_score']]
y = df['pass']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 3. TRAIN THE MODEL
# We are using Random Forest, a powerful machine learning algorithm
model = RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)

# 4. EVALUATE
predictions = model.predict(X_test)
print(f"Model Training Complete. Accuracy: {accuracy_score(y_test, predictions) * 100}%")

# 5. SAVE THE MODEL (This is your 'trained' file)
joblib.dump(model, 'app/student_model.pkl')
print("Model saved to app/student_model.pkl")