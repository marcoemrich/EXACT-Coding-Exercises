#!/bin/bash
# Debug script to check firewall configuration

echo "=== Firewall Debug Information ==="

echo "1. Current iptables rules:"
iptables -L -n -v

echo -e "\n2. Current ipset contents:"
ipset list permitted-hosts 2>/dev/null || echo "No ipset 'permitted-hosts' found"

echo -e "\n3. Testing DNS resolution:"
for service in "github.com" "api.github.com" "registry.npmjs.org"; do
    echo "Testing $service:"
    nslookup "$service" 2>/dev/null | grep -A 5 "Name:" || echo "  Failed to resolve"
done

echo -e "\n4. Testing connectivity:"
echo "Testing GitHub:"
timeout 5 wget -q --spider https://github.com 2>/dev/null && echo "  ✓ Success" || echo "  ✗ Failed"

echo "Testing npm registry:"
timeout 5 wget -q --spider https://registry.npmjs.org 2>/dev/null && echo "  ✓ Success" || echo "  ✗ Failed"

echo "Testing Anthropic API:"
timeout 5 wget -q --spider https://api.anthropic.com 2>/dev/null && echo "  ✓ Success" || echo "  ✗ Failed"

echo "Testing Portkey API:"
timeout 5 wget -q --spider https://api.portkey.ai 2>/dev/null && echo "  ✓ Success" || echo "  ✗ Failed"

echo "Testing blocked site:"
timeout 5 wget -q --spider https://google.com 2>/dev/null && echo "  ✗ Should be blocked!" || echo "  ✓ Correctly blocked"

echo -e "\n5. Container network info:"
ip route show default
echo "Gateway: $(ip route show default | awk '{print $3}')"

