import streamlit as st
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler # type: ignore
from sklearn.cluster import KMeans, DBSCAN, AgglomerativeClustering# type: ignore
from sklearn.decomposition import PCA# type: ignore
from sklearn.metrics import silhouette_score# type: ignore
import matplotlib.pyplot as plt
import seaborn as sns# type: ignore

st.set_page_config(page_title="Unsupervised ML Workbench", layout="wide")
st.title("🌀 Unsupervised Learning Workbench")

uploaded = st.file_uploader("Upload your CSV dataset", type=["csv"])
if uploaded:
    df = pd.read_csv(uploaded)
    st.write("### Data Preview", df.head())

    # Auto-select numeric features
    numeric_cols = df.select_dtypes(include=np.number).columns.tolist()
    selected_features = st.multiselect("Select features for clustering", numeric_cols, default=numeric_cols)

    if selected_features:
        X = df[selected_features]
        X_scaled = StandardScaler().fit_transform(X)

        algo = st.selectbox("Choose clustering algorithm", ["KMeans", "DBSCAN", "Agglomerative"])
        
        if algo == "KMeans":
            k = st.slider("Number of clusters (K)", 2, 10, 3)
            model = KMeans(n_clusters=k, random_state=42)
        elif algo == "DBSCAN":
            eps = st.slider("EPS (radius)", 0.1, 5.0, 0.5)
            min_samples = st.slider("Min samples", 2, 10, 5)
            model = DBSCAN(eps=eps, min_samples=min_samples)
        else:
            k = st.slider("Number of clusters", 2, 10, 3)
            model = AgglomerativeClustering(n_clusters=k)

        if st.button("Run Clustering"):
            clusters = model.fit_predict(X_scaled)
            df["Cluster"] = clusters

            st.write("Silhouette Score:", silhouette_score(X_scaled, clusters) if len(set(clusters)) > 1 else "N/A")

            # PCA for 2D visualization
            pca = PCA(n_components=2)
            X_pca = pca.fit_transform(X_scaled)
            df["PCA1"], df["PCA2"] = X_pca[:, 0], X_pca[:, 1]

            fig, ax = plt.subplots()
            sns.scatterplot(data=df, x="PCA1", y="PCA2", hue="Cluster", palette="tab10", ax=ax)
            st.pyplot(fig)

            # Option to download results
            st.download_button("Download clustered data", df.to_csv(index=False), "clustered_output.csv", "text/csv")
