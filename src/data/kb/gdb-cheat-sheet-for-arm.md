---
title: "GDB Cheat Sheet for ARM"
tags: ["debugging", "arm", "gdb"]
description: "Quick reference for GDB commands when debugging ARM targets."
lastUpdated: 2026-04-08
---

## Connection

```
target remote :3333
monitor reset halt
```

## Registers

```
info registers           # all registers
info registers r0 r1 pc  # specific registers
set $r0 = 0x41414141     # modify register
```

## Memory

```
x/16xw 0x20000000    # 16 words at address
x/s 0x08001234       # string at address
dump binary memory firmware.bin 0x08000000 0x08040000
```

## Breakpoints

```
break *0x08001234    # break at address
break main           # break at symbol
watch *0x20001000    # watchpoint on memory
info breakpoints     # list all
delete 1             # remove breakpoint #1
```

## Stepping

```
stepi     # single instruction
nexti     # step over calls
continue  # resume execution
until *0x08001300  # run until address
```

## Stack

```
backtrace        # call stack
frame 2          # switch to frame
info locals      # local variables
info args        # function arguments
```
