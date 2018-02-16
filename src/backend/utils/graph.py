import matplotlib as mpl
mpl.use('TkAgg')

import matplotlib.pyplot as plt


def show_plt(data):
    y = data
    x = range(len(data))
    plt.plot(x, y)
    plt.show()
    return
