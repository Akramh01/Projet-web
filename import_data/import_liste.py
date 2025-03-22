import pymysql

# Connexion à la base de données MySQL
connection = pymysql.connect(
    host="db-web-project.c7y2gyumqs5j.eu-north-1.rds.amazonaws.com",
    user="admin",
    password="Akram__UV",
    database="db-web-project"
)

cursor = connection.cursor()

# Chemin vers le fichier CSV
csv_file = "/Users/akramhamlat/Library/CloudStorage/OneDrive-Personnel/Etudes/L3/S2/Projet/Projet-web/Data/competences_personnel.csv"

# Lecture et traitement du fichier CSV ligne par ligne
records = []
with open(csv_file, 'r', encoding='utf-8') as file:
    for line_number, line in enumerate(file):
        line = line.strip()  # Supprimer les espaces et sauts de ligne
        columns = line.split(';')  # Séparer les colonnes par le délimiteur ;
        
        # Vérifier qu'il y a au moins un employé et une compétence
        if len(columns) < 2:
            print(f"Ligne {line_number + 1} ignorée : Pas assez de colonnes ({columns})")
            continue
        
        idE = columns[0].strip()  # ID de l'employé (colonne 1)
        competences = [c.strip() for c in columns[1:] if c.strip()]  # Compétences (colonnes restantes)

        # Créer une liste de tuples pour insertion
        for idC in competences:
            records.append((idE, idC)) # (idE, idC)

# Insérer les données dans la table Avoir
sql = """
INSERT INTO Avoir (idE, idC)
VALUES (%s, %s)
"""

for record in records:
    try:
        cursor.execute(sql, record)
    except Exception as e:
        print(f"Erreur lors de l'insertion de {record}: {e}")

# Valider les modifications et fermer la connexion
connection.commit()
cursor.close()
connection.close()

print("Données insérées avec succès dans la table Avoir.")
