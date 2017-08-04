
import csv
import networkx as nx
from modularity_algorithm import get_modules

f = "mockEnrollmentData.csv"
f = "test_data.csv"

nodes = []
edges = []
weights = {}
courses_per_student = {}

with open(f, 'r') as csvfile:
    reader = csv.reader(csvfile, delimiter=',')
    for i,row in enumerate(reader):
        if i == 0:
            pass
        student = row[0]
        nodes.append(student)
        if student not in courses_per_student.keys():
            courses_per_student[student]= set()
        courses_per_student[student].add(row[6])

nodes = set(nodes)

for n in nodes:
    for m in nodes:
        if m != n:
            if (m,n) not in edges:
                edges.append((n,m))
                number_of_courses = len(courses_per_student[n]&courses_per_student[m])
                weights[(n,m)] = number_of_courses

def make_graph(nodes, weights, min_weight=1):
    G = nx.Graph()
    G.add_nodes_from(nodes)
    G.add_weighted_edges_from([(edge[0],edge[1],w) for edge,w in weights.items() if w>=min_weight])
    return G 

G = make_graph(nodes,weights,min_weight=7)
modules = get_modules(G,factor = 1.3)
for m in modules:
    print len(m)
