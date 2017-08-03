
import csv
import networkx as nx

f = "mockEnrollmentData.csv"

nodes = []
edges = {}
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
            if True:
            # if (m,n) not in edges.keys():
                number_of_courses = len(courses_per_student[n]&courses_per_student[m])
                edges[(n,m)] = number_of_courses


#make the network!
G = nx.graph()
G.add_nodes_from(nodes)
G.add_edges_from(edges.keys()) #test me!

#do some clustering or modularity analysis here!






#TESTING THE NETWORKS BELOW

# values = edges.values()
# values.sort()
# print len(values)

# for v in set(values):
#     print v,values.count(v)

# x = []
# for n in nodes:
#     x.append(len(courses_per_student[n]))
    
# x.sort()
# print x

