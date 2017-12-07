import math
import numpy as np
np.set_printoptions(precision = 4, suppress = True)
import copy
import matplotlib.pyplot as plt
##############################
ktr = 100

def f(x, t):
    return 0
def lambda_f(u):
    return (5500.0 / (560.0 + u) + 0.942 * (10 ** (-10)) * (u ** 3)) / ktr

ro = 10950 / ktr
c = 236 / ktr
T0 = 323 / ktr
Th = 373 / ktr
Tc = 363 / ktr
L = 0.5
T = [0, 10, 60, 300, 600]
##############################
min_X = 0
max_X = L
h = 0.05
n = int((max_X - min_X)/h)
tau = 0.01 # tau/h <= 1

for k in range(len(T)): #0, 10, 60
    print(T[k])
    U = []
    for u in range(n+1):
        if u == 0: U.append(Th)
        if u == n: U.append(Tc)
        else: U.append(T0)

    U = np.array(U) / ktr
    t = 0
    while t < T[k]:
        alpha = np.zeros(n+1)
        betha = np.zeros(n+1)
        alpha[0] = float(U[0])
        betha[0] = float(U[-1])

        for i in range(1, n+1):
            a = lambda_f(U[i]) / (h ** 2.0)
            c = a
            b = 2 * lambda_f(U[i]) / (h ** 2.0) + ((ro * c) / tau)
            fun = f(i*h, t) - ((ro * c * U[i]) / tau)

            alpha[i] = a / (b - c * alpha[i - 1])
            betha[i] = (c * betha[i - 1] - fun) / (b - c * alpha[i - 1])

        for i in range(n, 0, -1):
            U[i] = alpha[i] * U[i + 1] + betha[i]

        t += tau
        print(U)

    plt.plot(np.array(range(0, n+2)) / 10, np.array(U)*ktr*ktr-273)
    plt.pause(0.1)

plt.show(block = True)







###
