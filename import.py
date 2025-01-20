import pandas as pd
import pymysql
from datetime import datetime

# Connexion à la base MySQL
connection = pymysql.connect(
    host='db-web-project.c7y2gyumqs5j.eu-north-1.rds.amazonaws.com',
    user='admin',
    password='Karima-0102',
    database='db-web-project'
)
# Charger le fichier CSV
csv_file = 'C:/Users/akram/OneDrive/Etudes/L3/S2/Projet/Projet-web/Data/liste_personnel.csv'
df = pd.read_csv(csv_file, sep=';')

# Convertir la colonne des dates au format YYYY-MM-DD
df['date entrée entreprise'] = pd.to_datetime(df['date entrée entreprise'], format='%d/%m/%Y').dt.strftime('%Y-%m-%d')

# Insérer les données dans MySQL
cursor = connection.cursor()
for _, row in df.iterrows():
    cursor.execute("""
        INSERT INTO Employes (nom, prenom, date_embauche, idE, poste, statut)
        VALUES (%s, %s, %s, %s, %s, %s)
    """, (row['Nom'], row['Prenom'], row['date entrée entreprise'], row['identifiant'], row['Poste'], row['Statut']))

connection.commit()
cursor.close()
connection.close()

print("Données importées avec succès.")
