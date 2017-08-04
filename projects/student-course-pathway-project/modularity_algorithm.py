import sys
import os
import numpy as np
import networkx as nx

def findSubgraph(subgraphs,n):
    for i,m in enumerate(subgraphs):
        if n in m:
            return i

def testModule(G,factor,subgraphNodes):
    isModule = False

    kin = 0
    kout = 0
    for s,t in G.edges():
        if s in subgraphNodes and t in subgraphNodes:
            kin+=1
        elif s in subgraphNodes or t in subgraphNodes:
            kout+=1

    #print 'degrees', kin,kout, G.degree(subgraphNodes)
    if kin>kout*factor:
        isModule = True
        #print "MODULE"

    return isModule

def edge_clustering(G):
    clusteringcoeffs = {}
    for s,t in G.edges():
        c = 0
        ns = set(nx.all_neighbors(G,s))
        nt = set(nx.all_neighbors(G,t))
        commons = ns.intersection(nt)
        ds = G.degree(s)
        dt = G.degree(t)
        c = (len(commons)+1)/float(min([ds,dt]))
        clusteringcoeffs[(s,t)] = c
    return clusteringcoeffs

def get_modules(G,factor):
    '''modularity algorithm from FAG-EC'''
    #initialize nodes as singleton clusters
    subgraphs = [[n] for n in G.nodes()]
    nonmergeable = []
    #get edge betweenness values and sort them by that value
    weights = edge_clustering(G)
    Sq = [(e,cc) for e,cc in weights.iteritems()]
    Sq.sort(key=lambda tup: tup[1],reverse=True)

    while len(Sq)>0:
        edge,cc = Sq.pop(0) #get mergeable edge with highest clustering coefficient
        s,t = edge[0],edge[1]
        mods = findSubgraph(subgraphs,s) #get index of the subgraph where node belongs
        modt = findSubgraph(subgraphs,t)

        if mods==modt: #already in the same subgraph
            continue
        #check if mergeable, ie. both not in nonmergeable modules
        elif findSubgraph(nonmergeable,s)==None and findSubgraph(nonmergeable,t)==None:
            ms = testModule(G,factor,subgraphs[mods])
            mt = testModule(G,factor,subgraphs[modt])
            if ms and mt: #if both modules, then non mergeable
                newmod = subgraphs[mods]
                nonmergeable.append(newmod)
                newmod = subgraphs[modt]
                nonmergeable.append(newmod)
            else: #merge
                newsubg = subgraphs.pop(mods)
                modt = findSubgraph(subgraphs,t) #need to do it again after poping
                s2 = subgraphs.pop(modt)
                newsubg.extend(s2)
                subgraphs.append(newsubg) #merging

        #THE FOLLOWING lines are consistent with the original algorithm,
        # which outputs all subgraphs, some modules some not.
        # elif findSubgraph(nonmergeable,s)==None:
        #     newmod = subgraphs[mods]
        #     nonmergeable.append(newmod)
        #     #set as non mergeable
        # elif findSubgraph(nonmergeable,t)==None:
        #     #set as non mergeable
        #     newmod = subgraphs[modt]
        #     nonmergeable.append(newmod)
        else: #both are modules, or one is a module so we continue
            continue

    return nonmergeable #return modules only, ie. not all nodes are returned.