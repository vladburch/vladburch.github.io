---
title: "Wireshark Filters — Must Know"
tags: ["network", "wireshark", "traffic-analysis"]
description: "Essential Wireshark display filters for daily workflow."
lastUpdated: 2026-04-02
---

## Basic Protocol Filters

```
tcp
udp
dns
http
tls
icmp
arp
```

## IP and Port Filters

```
ip.addr == 192.168.1.1
ip.src == 10.0.0.0/8
tcp.port == 443
tcp.dstport == 80
udp.port == 53
```

## HTTP Filters

```
http.request.method == "POST"
http.response.code == 200
http.host contains "example"
http.request.uri contains "/api"
```

## DNS Filters

```
dns.qry.name contains "suspicious"
dns.qry.type == 1       # A records
dns.resp.type == 28      # AAAA records
dns.flags.rcode != 0     # error responses
```

## TLS Filters

```
tls.handshake.type == 1          # Client Hello
tls.handshake.extensions.server_name contains "target"
tls.record.version == 0x0303     # TLS 1.2
```

## Useful Combinations

```
tcp.flags.syn == 1 && tcp.flags.ack == 0    # SYN only (new connections)
tcp.analysis.retransmission                  # retransmissions
tcp.analysis.zero_window                     # zero window events
frame.len > 1500                             # jumbo frames
```
