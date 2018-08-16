#!/usr/bin/env python3
import requests

teststring = """### Using the information to solve\n\nLet's plug $\\blueD{s(t_0)}=\\blueD{9}$ and $\\maroonD{s'(t_0)}=\\maroonD{-2}$ into the expression for $A'(t_0)$:\n\n$\\begin{align}\nA'(t_0)&=2\\blueD{s(t_0)}\\maroonD{s'(t_0)}\n\\\\\\\\\n&=2(\\blueD{9})(\\maroonD{-2})\n\\\\\\\\\n&=-36\n\\end{align}$"""
response = requests.post('http://localhost:9613/api/render-perseus', data={"input": teststring})

print(response.json())
