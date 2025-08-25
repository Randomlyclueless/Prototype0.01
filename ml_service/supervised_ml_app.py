import streamlit as st
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, cross_val_score # type: ignore
from sklearn.preprocessing import OneHotEncoder, StandardScaler# type: ignore
from sklearn.compose import ColumnTransformer# type: ignore
from sklearn.pipeline import Pipeline# type: ignore
from sklearn.impute import SimpleImputer# type: ignore
from sklearn.metrics import (# type: ignore
    accuracy_score, precision_score, recall_score, f1_score, confusion_matrix,
    mean_absolute_error, mean_squared_error, r2_score, classification_report
)
from sklearn.linear_model import LogisticRegression, LinearRegression, Ridge, Lasso# type: ignore
from sklearn.svm import SVC, SVR# type: ignore
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor# type: ignore
from sklearn.neighbors import KNeighborsClassifier, KNeighborsRegressor# type: ignore
import matplotlib.pyplot as plt

st.set_page_config(page_title="Supervised ML Workbench", layout="wide")
st.title("🧠 Supervised Learning Workbench")

# Upload dataset
uploaded = st.file_uploader("Upload your CSV dataset", type=["csv"])
if uploaded:
    df = pd.read_csv(uploaded)
    st.write("### Preview of Dataset", df.head())

    target = st.selectbox("Select target column", df.columns)
    features = st.multiselect("Select feature columns", [c for c in df.columns if c != target], default=[c for c in df.columns if c != target])

    if features and target:
        X = df[features]
        y = df[target]

        # Problem type
        if y.nunique() <= 10 and y.dtypes != "float":
            problem_type = "classification"
        else:
            problem_type = "regression"
        st.write(f"Detected problem type: *{problem_type}*")

        # Train/Test split
        test_size = st.slider("Test Size (%)", 10, 50, 20) / 100
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=test_size, random_state=42)

        # Preprocessing
        num_features = X.select_dtypes(include=[np.number]).columns
        cat_features = X.select_dtypes(exclude=[np.number]).columns

        transformers = []
        if len(num_features) > 0:
            transformers.append(("num", Pipeline([("imputer", SimpleImputer(strategy="median")), ("scaler", StandardScaler())]), num_features))
        if len(cat_features) > 0:
            transformers.append(("cat", Pipeline([("imputer", SimpleImputer(strategy="most_frequent")), ("onehot", OneHotEncoder(handle_unknown="ignore"))]), cat_features))

        preprocessor = ColumnTransformer(transformers)

        # Model selection
        if problem_type == "classification":
            model_name = st.selectbox("Choose model", ["Logistic Regression", "SVC", "Random Forest", "KNN"])
            if model_name == "Logistic Regression":
                model = LogisticRegression(max_iter=1000)
            elif model_name == "SVC":
                model = SVC(probability=True)
            elif model_name == "Random Forest":
                model = RandomForestClassifier()
            else:
                model = KNeighborsClassifier()
        else:
            model_name = st.selectbox("Choose model", ["Linear Regression", "Ridge", "Lasso", "Random Forest", "SVR", "KNN"])
            if model_name == "Linear Regression":
                model = LinearRegression()
            elif model_name == "Ridge":
                model = Ridge()
            elif model_name == "Lasso":
                model = Lasso()
            elif model_name == "Random Forest":
                model = RandomForestRegressor()
            elif model_name == "SVR":
                model = SVR()
            else:
                model = KNeighborsRegressor()

        pipe = Pipeline([("prep", preprocessor), ("model", model)])

        if st.button("Train Model"):
            pipe.fit(X_train, y_train)
            y_pred = pipe.predict(X_test)

            if problem_type == "classification":
                st.write("Accuracy:", accuracy_score(y_test, y_pred))
                st.write("Precision:", precision_score(y_test, y_pred, average="weighted", zero_division=0))
                st.write("Recall:", recall_score(y_test, y_pred, average="weighted", zero_division=0))
                st.write("F1:", f1_score(y_test, y_pred, average="weighted", zero_division=0))
                st.text(classification_report(y_test, y_pred, zero_division=0))

                cm = confusion_matrix(y_test, y_pred)
                fig, ax = plt.subplots()
                ax.matshow(cm, cmap="Blues")
                st.pyplot(fig)

            else:
                st.write("MAE:", mean_absolute_error(y_test, y_pred))
                st.write("MSE:", mean_squared_error(y_test, y_pred))
                st.write("RMSE:", np.sqrt(mean_squared_error(y_test, y_pred)))
                st.write("R2 Score:", r2_score(y_test, y_pred))

                fig, ax = plt.subplots()
                ax.scatter(y_test, y_pred)
                ax.set_xlabel("Actual")
                ax.set_ylabel("Predicted")
                st.pyplot(fig)