import pymysql
import pandas as pd

# Configuration de la connexion MySQL
host = "db-web-project.c7y2gyumqs5j.eu-north-1.rds.amazonaws.com"
user = "admin"
password = "Karima-0102"
database = "db-web-project"

# Connexion à la base de données MySQL
connection = pymysql.connect(
    host=host,
    user=user,
    password=password,
    database=database
)

# Charger le fichier CSV
csv_file = 'C:/Users/akram/OneDrive/Etudes/L3/S2/Projet/Projet-web/Data/liste_competences.csv'
competences_df = pd.read_csv(csv_file, sep=';', encoding='utf-8')

# Transformation des données si nécessaire
competences_df.columns = ["idC", "nom_en", "nom_fr"]  # Renommer les colonnes si besoin

# Insérer les données dans la table Competences
cursor = connection.cursor()

for _, row in competences_df.iterrows():
    sql = """
    INSERT INTO Competences (idC, nom_fr, nom_en)
    VALUES (%s, %s, %s)
    """
    cursor.execute(sql, (row["idC"], row["nom_fr"], row["nom_en"]))

# Valider et fermer la connexion
connection.commit()
cursor.close()
connection.close()

print("Données de compétences insérées avec succès !")
