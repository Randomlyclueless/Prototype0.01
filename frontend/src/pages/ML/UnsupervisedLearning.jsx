// src/pages/ML/UnsupervisedLearning.jsx
import React, { useState } from "react";

export default function UnsupervisedLearning() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("k-means");

  const styles = {
    container: {
      padding: "2rem",
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      color: "#f0f0f0",
      background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
      minHeight: "100vh",
    },
    header: {
      fontSize: "2.8rem",
      fontWeight: "800",
      marginBottom: "1.5rem",
      textAlign: "center",
      background: "linear-gradient(45deg, #FFD700, #FFA500)",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      color: "transparent",
      textShadow: "0 2px 4px rgba(0,0,0,0.2)",
    },
    subHeader: {
      fontSize: "1.8rem",
      marginTop: "2rem",
      marginBottom: "1rem",
      color: "#87CEFA",
      fontWeight: "600",
      borderLeft: "4px solid #87CEFA",
      paddingLeft: "1rem",
    },
    paragraph: {
      fontSize: "1.1rem",
      lineHeight: "1.7",
      marginBottom: "1.2rem",
      color: "#e0e0e0",
    },
    list: {
      marginLeft: "1.5rem",
      marginBottom: "1.5rem",
    },
    listItem: {
      marginBottom: "0.8rem",
      position: "relative",
      paddingLeft: "1.5rem",
    },
    listItemBullet: {
      position: "absolute",
      left: "0",
      color: "#FFD700",
    },
    card: {
      background: "rgba(255, 255, 255, 0.05)",
      borderRadius: "12px",
      padding: "1.5rem",
      marginBottom: "1.5rem",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(10px)",
    },
    tabContainer: {
      display: "flex",
      gap: "1rem",
      marginBottom: "2rem",
      flexWrap: "wrap",
    },
    tab: {
      padding: "0.8rem 1.5rem",
      borderRadius: "50px",
      cursor: "pointer",
      fontWeight: "600",
      transition: "all 0.3s ease",
      background: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
    },
    activeTab: {
      background: "linear-gradient(45deg, #87CEFA, #1E90FF)",
      color: "#0f2027",
      boxShadow: "0 4px 15px rgba(135, 206, 250, 0.3)",
    },
    algorithmSelector: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      gap: "1rem",
      marginBottom: "2rem",
    },
    algorithmCard: {
      background: "rgba(255, 255, 255, 0.05)",
      borderRadius: "12px",
      padding: "1.2rem",
      cursor: "pointer",
      transition: "all 0.3s ease",
      border: "2px solid transparent",
    },
    selectedAlgorithm: {
      border: "2px solid #87CEFA",
      boxShadow: "0 0 15px rgba(135, 206, 250, 0.4)",
      transform: "translateY(-5px)",
    },
    algorithmIcon: {
      fontSize: "2rem",
      marginBottom: "0.8rem",
      color: "#FFD700",
    },
    iframe: {
      width: "100%",
      height: "600px",
      border: "none",
      borderRadius: "12px",
      marginTop: "1.5rem",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
    },
    codeSnippet: {
      background: "#1e1e1e",
      borderRadius: "8px",
      padding: "1rem",
      overflowX: "auto",
      margin: "1.5rem 0",
      fontFamily: "'Fira Code', monospace",
      fontSize: "0.9rem",
    },
    visualExample: {
      display: "flex",
      justifyContent: "center",
      margin: "2rem 0",
    },
    exampleImage: {
      maxWidth: "100%",
      borderRadius: "12px",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
    },
    resourceLink: {
      color: "#87CEFA",
      textDecoration: "none",
      fontWeight: "600",
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      transition: "all 0.3s ease",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      margin: "1.5rem 0",
    },
    tableHeader: {
      background: "rgba(135, 206, 250, 0.2)",
      padding: "0.8rem",
      textAlign: "left",
      borderBottom: "2px solid #87CEFA",
    },
    tableCell: {
      padding: "0.8rem",
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    },
    comparisonContainer: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "1.5rem",
      margin: "1.5rem 0",
    },
    comparisonCard: {
      background: "rgba(255, 255, 255, 0.05)",
      borderRadius: "12px",
      padding: "1.2rem",
    },
    proConList: {
      margin: "0.5rem 0",
    },
    proItem: {
      color: "#90EE90",
    },
    conItem: {
      color: "#FF7F7F",
    },
  };

  const algorithms = [
    {
      id: "k-means",
      name: "K-Means Clustering",
      icon: "🟢",
      description:
        "Partitions data into K distinct clusters based on feature similarity.",
      pros: [
        "Simple to implement and understand",
        "Efficient for large datasets",
        "Guarantees convergence",
      ],
      cons: [
        "Requires specifying number of clusters (K)",
        "Sensitive to initial centroid positions",
        "Works poorly with non-spherical clusters",
      ],
      code: `# Python code example
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt

# Create KMeans model
model = KMeans(n_clusters=3, random_state=42)

# Fit the model
model.fit(X)

# Get cluster labels
labels = model.labels_

# Visualize the clusters
plt.scatter(X[:, 0], X[:, 1], c=labels, cmap='viridis')
plt.scatter(model.cluster_centers_[:, 0], model.cluster_centers_[:, 1], 
            s=200, c='red', marker='X')
plt.title('K-Means Clustering')
plt.show()`,
    },
    {
      id: "hierarchical",
      name: "Hierarchical Clustering",
      icon: "🌳",
      description:
        "Builds a hierarchy of clusters using agglomerative or divisive methods.",
      pros: [
        "Does not require specifying number of clusters",
        "Provides hierarchical structure (dendrogram)",
        "Works well with small datasets",
      ],
      cons: [
        "Computationally expensive for large datasets",
        "Sensitive to noise and outliers",
        "Once a decision is made to combine clusters, it can't be undone",
      ],
      code: `# Python code example
from sklearn.cluster import AgglomerativeClustering
import scipy.cluster.hierarchy as sch
import matplotlib.pyplot as plt

# Create Agglomerative Clustering model
model = AgglomerativeClustering(n_clusters=3, affinity='euclidean', linkage='ward')

# Fit the model and get labels
labels = model.fit_predict(X)

# Plot dendrogram
dendrogram = sch.dendrogram(sch.linkage(X, method='ward'))
plt.title('Dendrogram')
plt.xlabel('Data Points')
plt.ylabel('Euclidean Distances')
plt.show()`,
    },
    {
      id: "pca",
      name: "Principal Component Analysis",
      icon: "📉",
      description: "Reduces dimensionality of data while preserving variance.",
      pros: [
        "Reduces dimensionality while preserving information",
        "Removes correlated features",
        "Improves algorithm performance by reducing noise",
      ],
      cons: [
        "Results can be difficult to interpret",
        "Sensitive to data scaling",
        "Linear assumptions may not hold for complex data",
      ],
      code: `# Python code example
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt

# Create PCA model
pca = PCA(n_components=2)

# Fit and transform the data
X_pca = pca.fit_transform(X)

# Visualize the reduced data
plt.scatter(X_pca[:, 0], X_pca[:, 1], c=y, cmap='viridis')
plt.xlabel('First Principal Component')
plt.ylabel('Second Principal Component')
plt.title('PCA Visualization')
plt.show()

# Explained variance ratio
print("Explained variance ratio:", pca.explained_variance_ratio_)`,
    },
    {
      id: "dbscan",
      name: "DBSCAN",
      icon: "🔵",
      description:
        "Density-based clustering identifying clusters of arbitrary shape.",
      pros: [
        "Does not require specifying number of clusters",
        "Can find clusters of arbitrary shapes",
        "Robust to outliers",
      ],
      cons: [
        "Struggles with clusters of varying densities",
        "Sensitive to parameter selection (eps, min_samples)",
        "Not suitable for high-dimensional data",
      ],
      code: `# Python code example
from sklearn.cluster import DBSCAN
import matplotlib.pyplot as plt
import numpy as np

# Create DBSCAN model
model = DBSCAN(eps=0.3, min_samples=10)

# Fit the model and get labels
labels = model.fit_predict(X)

# Number of clusters in labels, ignoring noise if present
n_clusters = len(set(labels)) - (1 if -1 in labels else 0)
n_noise = list(labels).count(-1)

print("Estimated number of clusters:", n_clusters)
print("Estimated number of noise points:", n_noise)

# Visualize the clusters
unique_labels = set(labels)
colors = [plt.cm.Spectral(each) for each in np.linspace(0, 1, len(unique_labels))]

for k, col in zip(unique_labels, colors):
    if k == -1:
        # Black used for noise
        col = [0, 0, 0, 1]

    class_member_mask = labels == k

    xy = X[class_member_mask]
    plt.plot(xy[:, 0], xy[:, 1], 'o', markerfacecolor=tuple(col), 
             markeredgecolor='k', markersize=6)

plt.title('DBSCAN Clustering')
plt.show()`,
    },
    {
      id: "gmm",
      name: "Gaussian Mixture Models",
      icon: "📊",
      description:
        "Probabilistic model that assumes data is generated from Gaussian distributions.",
      pros: [
        "Soft clustering (probabilistic assignment)",
        "Flexible cluster shapes (covariance types)",
        "Works well with elliptical clusters",
      ],
      cons: [
        "Sensitive to initialization",
        "Can converge to local minima",
        "May overfit with too many components",
      ],
      code: `# Python code example
from sklearn.mixture import GaussianMixture
import matplotlib.pyplot as plt
import numpy as np

# Create GMM model
model = GaussianMixture(n_components=3, random_state=42)

# Fit the model
model.fit(X)

# Predict the labels
labels = model.predict(X)

# Get probabilities
probs = model.predict_proba(X)

# Visualize the clusters
plt.scatter(X[:, 0], X[:, 1], c=labels, cmap='viridis', s=50, alpha=0.6)
plt.title('Gaussian Mixture Model Clustering')
plt.show()`,
    },
  ];

  const applications = [
    {
      title: "Customer Segmentation",
      description:
        "Group customers based on purchasing behavior, demographics, or engagement patterns.",
      examples: ["E-commerce personalization", "Targeted marketing campaigns"],
    },
    {
      title: "Anomaly Detection",
      description:
        "Identify unusual patterns that do not conform to expected behavior.",
      examples: ["Fraud detection", "Network security", "Fault detection"],
    },
    {
      title: "Image Compression",
      description:
        "Reduce image file size by grouping similar colors together.",
      examples: ["K-means for color quantization", "PCA for image compression"],
    },
    {
      title: "Document Clustering",
      description: "Group similar documents together based on content.",
      examples: ["News article categorization", "Research paper organization"],
    },
    {
      title: "Genomic Data Analysis",
      description: "Identify patterns in gene expression data.",
      examples: ["Disease subtype discovery", "Gene function prediction"],
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div>
            <div style={styles.card}>
              <h2 style={styles.subHeader}>
                🔎 What is Unsupervised Learning?
              </h2>
              <p style={styles.paragraph}>
                Unsupervised learning is a type of machine learning where models
                are trained on unlabeled data. The goal is to discover hidden
                patterns, groupings, or structure without predefined labels or
                guidance. Unlike supervised learning, there are no correct
                answers or output variables to predict.
              </p>
              <div style={styles.visualExample}>
                <img
                  src="https://miro.medium.com/v2/resize:fit:1400/1*U1FQ7YtKjV3F6c1S6G9j0A.png"
                  alt="Unsupervised Learning Process"
                  style={{ ...styles.exampleImage, maxWidth: "80%" }}
                />
              </div>
            </div>

            <div style={styles.card}>
              <h2 style={styles.subHeader}>✨ Key Characteristics</h2>
              <ul style={styles.list}>
                <li style={styles.listItem}>
                  <span style={styles.listItemBullet}>•</span>
                  <strong>Works on unlabeled data:</strong> Finds patterns
                  without predefined categories or labels
                </li>
                <li style={styles.listItem}>
                  <span style={styles.listItemBullet}>•</span>
                  <strong>Exploratory analysis:</strong> Discovers hidden
                  structures and relationships in data
                </li>
                <li style={styles.listItem}>
                  <span style={styles.listItemBullet}>•</span>
                  <strong>Dimensionality reduction:</strong> Simplifies data
                  while preserving its essential characteristics
                </li>
                <li style={styles.listItem}>
                  <span style={styles.listItemBullet}>•</span>
                  <strong>Feature learning:</strong> Automatically learns
                  representations from data
                </li>
              </ul>
            </div>

            <div style={styles.card}>
              <h2 style={styles.subHeader}>📊 Unsupervised Learning Types</h2>
              <div style={styles.comparisonContainer}>
                <div style={styles.comparisonCard}>
                  <h3 style={{ color: "#FFD700", marginBottom: "1rem" }}>
                    Clustering
                  </h3>
                  <p style={styles.paragraph}>
                    Grouping similar data points together based on their
                    characteristics.
                  </p>
                  <ul style={styles.proConList}>
                    <li style={{ ...styles.listItem, ...styles.proItem }}>
                      <span style={styles.listItemBullet}>•</span>
                      K-Means, Hierarchical, DBSCAN
                    </li>
                    <li style={{ ...styles.listItem, ...styles.proItem }}>
                      <span style={styles.listItemBullet}>•</span>
                      Customer segmentation, image compression
                    </li>
                  </ul>
                </div>

                <div style={styles.comparisonCard}>
                  <h3 style={{ color: "#FFD700", marginBottom: "1rem" }}>
                    Dimensionality Reduction
                  </h3>
                  <p style={styles.paragraph}>
                    Reducing the number of features while preserving important
                    information.
                  </p>
                  <ul style={styles.proConList}>
                    <li style={{ ...styles.listItem, ...styles.proItem }}>
                      <span style={styles.listItemBullet}>•</span>
                      PCA, t-SNE, Autoencoders
                    </li>
                    <li style={{ ...styles.listItem, ...styles.proItem }}>
                      <span style={styles.listItemBullet}>•</span>
                      Data visualization, noise reduction
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div style={styles.card}>
              <h2 style={styles.subHeader}>
                🎯 When to Use Unsupervised Learning
              </h2>
              <ul style={styles.list}>
                <li style={styles.listItem}>
                  <span style={styles.listItemBullet}>•</span>
                  When you have unlabeled data and want to discover patterns
                </li>
                <li style={styles.listItem}>
                  <span style={styles.listItemBullet}>•</span>
                  For exploratory data analysis and hypothesis generation
                </li>
                <li style={styles.listItem}>
                  <span style={styles.listItemBullet}>•</span>
                  To reduce dimensionality before applying supervised algorithms
                </li>
                <li style={styles.listItem}>
                  <span style={styles.listItemBullet}>•</span>
                  For anomaly detection in datasets
                </li>
                <li style={styles.listItem}>
                  <span style={styles.listItemBullet}>•</span>
                  When you need to group similar items for recommendation
                  systems
                </li>
              </ul>
            </div>
          </div>
        );

      case "algorithms":
        return (
          <div>
            <div style={styles.card}>
              <h2 style={styles.subHeader}>🛠️ Select an Algorithm</h2>
              <div style={styles.algorithmSelector}>
                {algorithms.map((algo) => (
                  <div
                    key={algo.id}
                    style={{
                      ...styles.algorithmCard,
                      ...(selectedAlgorithm === algo.id
                        ? styles.selectedAlgorithm
                        : {}),
                    }}
                    onClick={() => setSelectedAlgorithm(algo.id)}
                  >
                    <div style={styles.algorithmIcon}>{algo.icon}</div>
                    <h3 style={{ margin: "0.5rem 0", color: "#FFF" }}>
                      {algo.name}
                    </h3>
                    <p
                      style={{
                        ...styles.paragraph,
                        fontSize: "0.9rem",
                        margin: 0,
                      }}
                    >
                      {algo.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.card}>
              <h2 style={styles.subHeader}>
                Algorithm Details:{" "}
                {algorithms.find((a) => a.id === selectedAlgorithm).name}
              </h2>
              {algorithms
                .filter((algo) => algo.id === selectedAlgorithm)
                .map((algo) => (
                  <div key={algo.id}>
                    <p style={styles.paragraph}>{algo.description}</p>

                    <div style={styles.comparisonContainer}>
                      <div style={styles.comparisonCard}>
                        <h3 style={{ color: "#90EE90", marginBottom: "1rem" }}>
                          ✅ Advantages
                        </h3>
                        <ul style={styles.list}>
                          {algo.pros.map((pro, index) => (
                            <li
                              key={index}
                              style={{ ...styles.listItem, ...styles.proItem }}
                            >
                              <span style={styles.listItemBullet}>•</span>
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div style={styles.comparisonCard}>
                        <h3 style={{ color: "#FF7F7F", marginBottom: "1rem" }}>
                          ❌ Limitations
                        </h3>
                        <ul style={styles.list}>
                          {algo.cons.map((con, index) => (
                            <li
                              key={index}
                              style={{ ...styles.listItem, ...styles.conItem }}
                            >
                              <span style={styles.listItemBullet}>•</span>
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <h3 style={{ color: "#87CEFA", margin: "1.5rem 0 1rem 0" }}>
                      Code Example
                    </h3>
                    <div style={styles.codeSnippet}>{algo.code}</div>

                    <h3 style={{ color: "#87CEFA", margin: "1.5rem 0 1rem 0" }}>
                      Visualization
                    </h3>
                    <div style={styles.visualExample}>
                      <img
                        src={`https://scikit-learn.org/stable/_images/sphx_glr_plot_${algo.id}_001.png`}
                        alt={`${algo.name} visualization`}
                        style={{ ...styles.exampleImage, maxWidth: "80%" }}
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/600x400/2c5364/87CEFA?text=Visualization+Example";
                        }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        );

      case "applications":
        return (
          <div>
            <div style={styles.card}>
              <h2 style={styles.subHeader}>💡 Real-World Applications</h2>
              <p style={styles.paragraph}>
                Unsupervised learning has diverse applications across
                industries. Here are some of the most common and impactful use
                cases:
              </p>

              <div style={styles.comparisonContainer}>
                {applications.map((app, index) => (
                  <div key={index} style={styles.comparisonCard}>
                    <h3 style={{ color: "#FFD700", marginBottom: "1rem" }}>
                      {app.title}
                    </h3>
                    <p style={styles.paragraph}>{app.description}</p>
                    <ul style={styles.list}>
                      {app.examples.map((example, i) => (
                        <li key={i} style={styles.listItem}>
                          <span style={styles.listItemBullet}>•</span>
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.card}>
              <h2 style={styles.subHeader}>📈 Industry Use Cases</h2>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>Industry</th>
                    <th style={styles.tableHeader}>Application</th>
                    <th style={styles.tableHeader}>Techniques</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={styles.tableCell}>E-commerce</td>
                    <td style={styles.tableCell}>Customer segmentation</td>
                    <td style={styles.tableCell}>K-Means, DBSCAN</td>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}>Finance</td>
                    <td style={styles.tableCell}>Fraud detection</td>
                    <td style={styles.tableCell}>
                      Isolation Forest, Autoencoders
                    </td>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}>Healthcare</td>
                    <td style={styles.tableCell}>Patient stratification</td>
                    <td style={styles.tableCell}>
                      Hierarchical clustering, GMM
                    </td>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}>Marketing</td>
                    <td style={styles.tableCell}>Market basket analysis</td>
                    <td style={styles.tableCell}>Apriori, FP-Growth</td>
                  </tr>
                  <tr>
                    <td style={styles.tableCell}>Manufacturing</td>
                    <td style={styles.tableCell}>Quality control</td>
                    <td style={styles.tableCell}>PCA, K-Means</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );

      case "resources":
        return (
          <div style={styles.card}>
            <h2 style={styles.subHeader}>📚 Learning Resources</h2>
            <p style={styles.paragraph}>
              Expand your knowledge of unsupervised learning with these curated
              resources:
            </p>

            <h3 style={{ color: "#87CEFA", margin: "1.5rem 0 1rem 0" }}>
              Online Courses
            </h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <a
                  href="https://www.coursera.org/learn/unsupervised-machine-learning"
                  style={styles.resourceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ↗ Unsupervised Learning Course (Coursera)
                </a>
              </li>
              <li style={styles.listItem}>
                <a
                  href="https://www.udacity.com/course/machine-learning-unsupervised-learning--ud741"
                  style={styles.resourceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ↗ Unsupervised Learning Nanodegree (Udacity)
                </a>
              </li>
            </ul>

            <h3 style={{ color: "#87CEFA", margin: "1.5rem 0 1rem 0" }}>
              Books
            </h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <a
                  href="https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/"
                  style={styles.resourceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ↗ Hands-On Machine Learning with Scikit-Learn, Keras, and
                  TensorFlow
                </a>
              </li>
              <li style={styles.listItem}>
                <a
                  href="https://www.packtpub.com/product/mastering-unsupervised-learning-with-python/9781789348273"
                  style={styles.resourceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ↗ Mastering Unsupervised Learning with Python
                </a>
              </li>
            </ul>

            <h3 style={{ color: "#87CEFA", margin: "1.5rem 0 1rem 0" }}>
              Practice Datasets
            </h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <a
                  href="https://www.kaggle.com/datasets"
                  style={styles.resourceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ↗ Kaggle Datasets
                </a>
              </li>
              <li style={styles.listItem}>
                <a
                  href="https://archive.ics.uci.edu/ml/index.php"
                  style={styles.resourceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ↗ UCI Machine Learning Repository
                </a>
              </li>
            </ul>

            <h3 style={{ color: "#87CEFA", margin: "1.5rem 0 1rem 0" }}>
              Tutorials & Documentation
            </h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <a
                  href="https://scikit-learn.org/stable/unsupervised_learning.html"
                  style={styles.resourceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ↗ Scikit-learn Unsupervised Learning Documentation
                </a>
              </li>
              <li style={styles.listItem}>
                <a
                  href="https://towardsdatascience.com/unsupervised-learning-with-python-173c51dc7f03"
                  style={styles.resourceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ↗ Unsupervised Learning with Python (Towards Data Science)
                </a>
              </li>
            </ul>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>📘 Unsupervised Learning</h1>

      <div style={styles.tabContainer}>
        {[
          { id: "overview", label: "Overview", icon: "🔍" },
          { id: "algorithms", label: "Algorithms", icon: "🛠️" },
          { id: "applications", label: "Applications", icon: "💡" },
          { id: "resources", label: "Resources", icon: "📚" },
          { id: "workbench", label: "ML Workbench", icon: "🧪" },
        ].map((tab) => (
          <div
            key={tab.id}
            style={{
              ...styles.tab,
              ...(activeTab === tab.id ? styles.activeTab : {}),
            }}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon} {tab.label}
          </div>
        ))}
      </div>

      {activeTab !== "workbench" && renderTabContent()}

      {activeTab === "workbench" && (
        <div style={styles.card}>
          <h2 style={styles.subHeader}>🧪 ML Workbench</h2>
          <p style={styles.paragraph}>
            Upload a dataset and experiment with unsupervised learning models
            interactively. Try different algorithms, adjust parameters, and
            visualize the results in real-time.
          </p>
          <iframe
            src="http://localhost:8506"
            title="Unsupervised Learning Streamlit App"
            style={styles.iframe}
          />
          <div style={{ marginTop: "1.5rem" }}>
            <h3 style={{ color: "#87CEFA", marginBottom: "1rem" }}>
              Workbench Features
            </h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <span style={styles.listItemBullet}>•</span>
                Upload your own dataset or use sample data
              </li>
              <li style={styles.listItem}>
                <span style={styles.listItemBullet}>•</span>
                Apply various preprocessing techniques
              </li>
              <li style={styles.listItem}>
                <span style={styles.listItemBullet}>•</span>
                Compare different algorithms side by side
              </li>
              <li style={styles.listItem}>
                <span style={styles.listItemBullet}>•</span>
                Visualize clusters and dimensionality reduction results
              </li>
              <li style={styles.listItem}>
                <span style={styles.listItemBullet}>•</span>
                Export models and results for further analysis
              </li>
            </ul>
          </div>
        </div>
      )}

      <style>
        {`
          a:hover {
            color: #FFD700 !important;
            text-decoration: underline !important;
          }
          tr:hover {
            background-color: rgba(255, 255, 255, 0.05);
          }
        `}
      </style>
    </div>
  );
}
