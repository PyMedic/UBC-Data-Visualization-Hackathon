import csv
import networkx as nx
import matplotlib.pyplot as plt
from modularity_algorithm import get_modules

datafile = "mockEnrollmentData.csv"

def make_nodes_and_weigts(f):
	nodes = []
	edges = []
	weights = {}
	courses_per_student = {}

	#We first save what courses students took
	# courses_per_student = {student1:set(course1,course2),...}
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
	edge_courses = {}

	#Now that we have nodes (students)
	# we define edges with their weights as number of courses taken in comon by 2 students
	# weights = {(s1,s2):7,...}
	# edge_courses = {(s1,s2): set(courses in comon),...}
	for n in nodes:
	    for m in nodes:
	        if m != n:
	            if (m,n) not in edges:
	                edges.append((n,m))
	                number_of_courses = len(courses_per_student[n]&courses_per_student[m])
	                weights[(n,m)] = number_of_courses
	                edge_courses[(n,m)] = courses_per_student[n]&courses_per_student[m]

	return nodes, courses_per_student, edges, weights, edge_courses

#Make the graph using nodes and edges
def make_graph(nodes, weights, min_weight=1):
    G = nx.Graph()
    G.add_nodes_from(nodes)
    G.add_weighted_edges_from([(edge[0],edge[1],w) for edge,w in weights.items() if w>=min_weight])
    return G 

def get_courses_per_module(modules,edge_courses):
	courses_per_module = {}

	for i,m in enumerate(modules):
		courses_per_module[i] = []
		for edge,courses in edge_courses.items():
			if edge[0] in m and edge[1] in m:
				courses_per_module[i].extend(list(courses))
	return courses_per_module

def draw_colored(G):
	pos = nx.spring_layout(G,weight='weight', scale=0.1)

	all_module_nodes = []
	for m in modules:
		all_module_nodes.extend(m)

	for node in nodes:
		if node not in all_module_nodes:
			nx.draw_networkx_nodes(G,pos,
	                       nodelist=[node],
	                       node_color='black',
	                       node_size=300,
	                   alpha=0.8)

	colors = ['r','b','g']*10
	for i,m in enumerate(modules):
		nx.draw_networkx_nodes(G,pos,
		                       nodelist=m,
		                       node_color=colors[i],
		                       node_size=300,
		                   alpha=0.8)

	nx.draw_networkx_edges(G,pos,width=1.0,alpha=0.5)

	plt.show()


###########
nodes, courses_per_student, edges, weights, edge_courses = make_nodes_and_weigts(datafile)

G = make_graph(nodes,weights,min_weight=7)

for factor in [0.1,0.2,0.5,0.9,1]:
	modules = get_modules(G,factor = factor)
	print 'factor', factor
	for i,m in enumerate(modules):
		print i,len(m)

	courses_per_module = get_courses_per_module(modules,edge_courses)

	for m,courses in courses_per_module.items():
		print len(set(courses)), set((courses))

	draw_colored(G)


		#TODO

		# add description to github
		# add viz to github
		# send list of courses for each module
		# send list of students for each module
		# play with factor, to find more modules


# nx.write_gml(G,"student_network_weight7.gml")
